<script lang="ts">
import Main from "../../../components/Main.svelte";
import SearchBar from "../../../components/SearchBar.svelte";
import ProductByCategory from "../../../components/ProductByCategory.svelte";
import Filtre from "../../../components/Filtre.svelte";
import ModalBox from "../../../components/ModalBox.svelte";
import { articles } from "../../../store/articles";
    
const categories = [
    "Mode", 
    "Informatique", 
    "Électroménager", 
    "Sport", 
    "Supermarché", 
    "Jeux vidéos & consoles"
    ];
const data = [{

    id: "art-001",
    userId: "user-123",
    title: "MacBook Pro M3",
    images: [ 
        "/profile.png",
        "/profile.png",
        "/profile.png",
        "/profile.png",
        "/profile.png",
        ],
    category: ["Informatique", "Électroménager"],
    description: "Ordinateur ultra puissant pour les professionnels du montage et du code.",
    price: 2499,
    stock: 15,
    rates: 1240,
    createdAt: new Date("2024-01-15T10:00:00"),
    updatedAt: new Date("2024-01-20T14:30:00")
    },
    {
    id: "art-002",
    userId: "user-456",
    title: "Nike Air Jordan 1",
    images: [ 
        "/profile.png",
        "/pofile.png",
        "/profile.png",
        "/profile.png",
        "/profile.png",
        ],
    category: ["Mode", "Sport"],
    description: "Baskets iconiques en édition limitée, confortables et stylées.",
    price: 180,
    stock: 5,
    rates: 850,
    createdAt: new Date("2024-02-01T08:00:00"),
    updatedAt: new Date("2024-02-01T08:00:00")
    },
    {
    id: "art-003",
    userId: "user-123",
    title: "PlayStation 5",
    images: [ 
        "/profile.png",
        "/profile.png",
        "/profile.png",
        "/profile.png",
        "/profile.png",
    ],
    category: ["Jeux vidéos & consoles"],
    description: "Console de nouvelle génération avec retour haptique et SSD ultra-rapide.",
    price: 499,
    stock: 0,
    rates: 3200,
    createdAt: new Date("2023-12-10T12:00:00"),
    updatedAt: new Date("2024-01-05T09:15:00")
    },
    {
    id: "art-004",
    userId: "user-123",
    title: "PlayStation 5",
    images: [ 
        "/profile.png",
        "/profile.png",
        "/profile.png",
        "/profile.png",
        "/profile.png",
    ],
    category: ["Jeux vidéos & consoles"],
    description: "Console de nouvelle génération avec retour haptique et SSD ultra-rapide.",
    price: 2000,
    stock: 0,
    rates: 3200,
    createdAt: new Date("2023-12-10T12:00:00"),
    updatedAt: new Date("2024-01-05T09:15:00")
    },
    {
        id: "art-005",
        userId: "user-123",
        title: "PS 5",
        images: [ 
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
        ],
        category: ["Jeux vidéos & consoles"],
        description: "Console de nouvelle génération avec retour haptique et SSD ultra-rapide.",
        price: 4000,
        stock: 0,
        rates: 3,
        createdAt: new Date("2023-12-10T12:00:00"),
        updatedAt: new Date("2024-01-05T09:15:00")
    },
    {
        id: "art-006",
        userId: "user-123",
        title: "Play 4",
        images: [ 
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
        ],
        category: ["Jeux vidéos & consoles"],
        description: "Console de nouvelle génération avec retour haptique et SSD ultra-rapide.",
        price: 1500,
        stock: 0,
        rates: 5,
        createdAt: new Date("2023-12-10T12:00:00"),
        updatedAt: new Date("2024-01-05T09:15:00")
}
]
    articles.set(data)

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
    let result = [...$articles ];

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
    result = result.filter(a => a.price <= maxPrice);

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
        

        <ProductByCategory data = {filteredItems} />
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
                    <button class="btn btn-ghost justify-between w-full border-b border-base-300 rounded-none h-14" onclick={() => setSort('rates')}>
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
                        class="btn {filterStatus === 'inStock' } justify-between w-full border-b border-base-300 rounded-none h-14" 
                        onclick={() => setFilter('inStock')}
                    >
                        En stock uniquement 
                        <span>
                            {#if filterStatus === 'inStock'}
                                <span class="badge badge-success badge-xs"></span> 
                             {:else}
                                <span class="badge badge-primary badge-lg font-round opacity-50"></span>
                             {/if}
                        </span>
                    </button>
                    <div class="flex flex-col gap-4 p-4 w-full border-b border-base-300">
                        <div class="flex justify-between items-center">
                            <span class="font-medium ">Prix maximum</span>
                            <span class="badge badge-primary badge-lg font-bold">{maxPrice} Fcf</span>
                        </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="5000" 
                                bind:value={maxPrice} 
                                class="range range-primary range-sm" 
                                step="10" 
                                onclick={() => setFilter('inPrice')}
                            />
    
                            <div class="flex justify-between text-xs px-2">
                                <span>0 Fcf</span>
                                <span>250000 Fcf</span>
                                <span>500000 Fcf</span>
                            </div>
                        </div>
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
