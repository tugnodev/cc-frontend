<script lang="ts">
    import Main from "../../../components/Main.svelte";
    import SearchBar from "../../../components/SearchBar.svelte";
    import ProductByCategory from "../../../components/ProductByCategory.svelte";
    import Filtre from "../../../components/Filtre.svelte";
    import ModalBox from "../../../components/ModalBox.svelte";
    import { articles } from "../../../store/articles";
    import { searchResults } from "../../../store/articles";
    import { onMount } from "svelte";

    const categories = [
        "Mode",
        "Informatique",
        "Électroménager",
        "Sport",
        "Supermarché",
        "Jeux vidéos & consoles",
    ];

    async function loadArticles() {
        try {
            const response = await fetch("http://localhost:3000/api/articles");
            if (response.ok) {
                const data = await response.json();
                console.log(JSON.stringify);
                articles.set(data);
            } else {
                console.error("Erreur lors de la récupération");
            }
        } catch (error) {
            console.error("Le serveur est injoignable", error);
        }
    }

    onMount(() => {
        loadArticles();
    });

    // --- ÉTATS ---
    let search = $state("");
    let selectedCategory = $state("");
    let currentSort = $state("");
    let filterStatus = $state("");
    let showSortModal = $state(false);
    let showFilterModal = $state(false);
    let maxPrice = $state(500000);

    // --- LOGIQUE RÉACTIVE ---
    let filteredItems = $derived.by(() => {
        let result = [...$articles];

        //  Recherche
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter((a) => a.title.toLowerCase().includes(q));
        }

        //  Catégorie
        if (selectedCategory) {
            result = result.filter((a) =>
                a.category.includes(selectedCategory),
            );
        }

        //  Filtre Stock
        if (filterStatus === "inStock") {
            result = result.filter((a) => a.stock > 0);
        }
        result = result.filter((a) => a.price <= maxPrice);

        //  Tri
        if (currentSort === "price") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (currentSort === "stock") {
            result = [...result].sort((a, b) => b.stock - a.stock);
        } else if (currentSort === "rates") {
            result = [...result].sort((a, b) => b.rates - a.rates);
        }

        return result;
    });

    // --- ACTIONS ---
    const handleSearch = (q: string) => (search = q);

    function setFilter(type: string) {
        filterStatus = filterStatus === type ? "" : type;
    }

    // LIAISON AVEC LE STORE
    $effect(() => {
        searchResults.set(filteredItems);
    });

    // --- FONCTION DE MISE À ZÉRO (RESET) ---
    function resetFilters() {
        search = "";
        selectedCategory = "";
        currentSort = "";
        filterStatus = "";
        maxPrice = 500000;
    }
</script>

<Main>
    <SearchBar
        onSearch={handleSearch}
        placeholder="Rechercher vos commandes..."
    />

    <div class="p-0">
        <h3 class="text-xl font-semibold mb-4">Catégories</h3>
        <div class="flex flex-wrap gap-3">
            {#each categories as cat}
                <button
                    onclick={() =>
                        (selectedCategory =
                            selectedCategory === cat ? "" : cat)}
                    class="btn btn-sm
                    {selectedCategory === cat ? 'btn-primary' : 'btn-outline'}"
                >
                    {cat}
                </button>
            {/each}
            {#if selectedCategory}
                <div class="mt-4 alert alert-info">
                    Filtre actif :
                    <strong>{selectedCategory}</strong>
                </div>
            {/if}
        </div>

        <ProductByCategory data={filteredItems} />
    </div>

    <Filtre
        on:sort={() => (showSortModal = true)}
        on:filter={() => (showFilterModal = true)}
    />

    {#if showSortModal}
        <ModalBox onClose={() => (showSortModal = false)}>
            <div class="flex flex-col gap-2 p-4 w-full">
                <h3 class="text-xl font-bold mb-4 text-center">Trier par</h3>
                <div class="flex flex-col gap-3 w-full">
                    <button
                        class="btn btn-ghost justify-between w-full border-b border-base-300 rounded-none h-14"
                        onclick={() => setSort("price")}
                    >
                        Prix croissant <span>💰</span>
                    </button>
                    <button
                        class="btn btn-ghost justify-between w-full border-b border-base-300 rounded-none h-14"
                        onclick={() => setSort("stock")}
                    >
                        Meilleur Stock <span>📦</span>
                    </button>
                    <button
                        class="btn btn-ghost justify-between w-full border-b border-base-300 rounded-none h-14"
                        onclick={() => setSort("rates")}
                    >
                        Popularité <span>🔥</span>
                    </button>
                </div>
                <button
                    class="btn btn-error btn-soft mt-6 w-full"
                    onclick={() => (showSortModal = false)}
                >
                    Annuler
                </button>
            </div>
        </ModalBox>
    {/if}

    {#if showFilterModal}
        <ModalBox onClose={() => (showFilterModal = false)}>
            <div class="flex flex-col gap-2 p-4 w-full">
                <h3 class="text-xl font-bold mb-4 text-center">Filtrer par</h3>
                <div class="flex flex-col gap-3 w-full">
                    <button
                        class="btn {filterStatus ===
                            'inStock'} justify-between w-full border-b border-base-300 rounded-none h-14"
                        onclick={() => setFilter("inStock")}
                    >
                        En stock uniquement
                        <span>
                            {#if filterStatus === "inStock"}
                                <span class="badge badge-success badge-xs"
                                ></span>
                            {:else}
                                <span
                                    class="badge badge-primary badge-lg font-round opacity-50"
                                ></span>
                            {/if}
                        </span>
                    </button>
                    <div
                        class="flex flex-col gap-4 p-4 w-full border-b border-base-300"
                    >
                        <div class="flex justify-between items-center">
                            <span class="font-medium">Prix maximum</span>
                            <span class="badge badge-primary badge-lg font-bold"
                                >{maxPrice} Fcf</span
                            >
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            bind:value={maxPrice}
                            class="range range-primary range-sm"
                            step="10"
                            onclick={() => setFilter("inPrice")}
                        />

                        <div class="flex justify-between text-xs px-2">
                            <span>0 Fcf</span>
                            <span>250000 Fcf</span>
                            <span>500000 Fcf</span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-2 mt-8 w-full">
                    <button
                        class="btn btn-error btn-soft mt-6 w-full"
                        onclick={() => (showFilterModal = false)}
                    >
                        Appliquer
                    </button>
                </div>
            </div>
        </ModalBox>
    {/if}
</Main>
