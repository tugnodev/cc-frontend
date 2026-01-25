<script lang="ts">
    import Main from "../../../components/Main.svelte";
    import SearchBar from "../../../components/SearchBar.svelte";
    import ProductByCategory from "../../../components/ProductByCategory.svelte";
    import Filtre from "../../../components/Filtre.svelte";
    import ModalBox from "../../../components/ModalBox.svelte";
    import { articles } from "../../../store/articles";

    const categories = ["Mode", "Informatique", "Électroménager", "Sport", "Supermarché", "Jeux vidéos & consoles"];

    // --- ÉTATS (Runes Svelte 5) ---
    let search = $state("");
    let selectedCategory = $state("");
    let currentSort = $state(""); // "price", "stock", "views"
    let filterStatus = $state(""); // "inStock"
    
    // États des modales
    let showSortModal = $state(false);
    let showFilterModal = $state(false);

    // --- LOGIQUE RÉACTIVE (Remplaçant du $:) ---
    // On utilise $derived pour que filteredItems se mette à jour dès que ses dépendances changent
    let filteredItems = $derived.by(() => {
        let result = $articles;

        //  Recherche
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(a => a.title.toLowerCase().includes(q));
        }

        //  Catégorie
        if (selectedCategory) {
            result = result.filter(a => a.category.includes(selectedCategory));
        }

        //  Filtre Stock
        if (filterStatus === "inStock") {
            result = result.filter(a => a.stock > 0);
        }
        if (filterStatus === "inPrice") {
            result = [...result].sort((a, b) => a.price - b.price);
        }

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
    const handleSearch = (q: string) => search = q;
    
    function setSort(type: string) {
        currentSort = type;
        showSortModal = false;
    }

    function setFilter(type: string) {
        filterStatus = filterStatus === type ? "" : type;
        // On ne ferme pas ici pour laisser l'utilisateur voir le changement avant d'appliquer
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
                    onclick={() => selectedCategory = (selectedCategory === cat ? "" : cat)}
                    class="btn btn-sm
                    {selectedCategory === cat 
                        ? 'btn-primary' : 'btn-outline'}"
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
        

        <ProductByCategory items={filteredItems} />
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
                    <button class="btn btn-ghost justify-between w-full border-b border-base-300 rounded-none h-14" onclick={() => setSort('price')}>
                        Prix croissant <span>💰</span>
                    </button>
                    <button class="btn btn-ghost justify-between w-full border-b border-base-300 rounded-none h-14" onclick={() => setSort('stock')}>
                        Meilleur Stock <span>📦</span>
                    </button>
                    <button class="btn btn-ghost justify-between w-full border-b border-base-300 rounded-none h-14" onclick={() => setSort('views')}>
                        Popularité <span>🔥</span>
                    </button>
                </div>
                <button class="btn btn-error btn-soft mt-6 w-full" onclick={() => (showSortModal = false)}>
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
                        class="btn {filterStatus === 'inStock' ?  'btn-primary' : 'btn-outline'} justify-between w-full border-b border-base-300 rounded-none h-14" 
                        onclick={() => setFilter('inStock')}
                    >
                        En stock uniquement 
                        <span>{filterStatus === 'inStock' ? '✅' : '⚪'}</span>
                    </button>
                    <button 
                        class="btn {filterStatus === 'inPrice' ?  'btn-primary' : 'btn-outline'} justify-between w-full border-b border-base-300 rounded-none h-14" 
                        onclick={() => setFilter('inPrice')}
                    >
                        En fonction du prix 
                        <span>{filterStatus === 'inPrice' ? '✅' : '⚪'}</span>
                    </button>
                </div>
                <div class="flex gap-2 mt-8 w-full">
                    <button class="btn btn-error btn-soft mt-6 w-full" onclick={() => (showFilterModal = false)}>
                        Appliquer
                    </button>
                </div>
            </div>
        </ModalBox>
    {/if}
</Main>