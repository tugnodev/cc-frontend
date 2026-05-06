<script lang="ts">
    import { ArrowUp, ArrowDown, ChevronsUpDown, X } from "@lucide/svelte";
    import ArticleCard from "./ArticleCard.svelte";
    import type { articleDto } from "$lib/services/dtos/article";

    type Props = {
        articles?: articleDto[];
        loading?: boolean;
        onEdit: (article: articleDto) => void;
        onDelete: (article: articleDto) => void;
        onViewImage?: (image: string) => void;
    };

    let { articles = [], loading = false, onEdit, onDelete, onViewImage }: Props = $props();

    let search = $state("");
    let sortKey = $state<"price" | "stock" | null>(null);
    let sortDir = $state(1); // 1 = asc, -1 = desc

    const filtered = $derived(
        (() => {
            // Ensure articles is an array
            if (!Array.isArray(articles)) return [];
            
            const q = search.trim().toLowerCase();
            let list = articles.filter(
                (a) =>
                    !q ||
                    a.title.toLowerCase().includes(q) ||
                    (a.description || "").toLowerCase().includes(q)
            );

            if (sortKey) {
                const key = sortKey;
                list = list
                    .slice()
                    .sort((a, b) => ((a[key] ?? 0) - (b[key] ?? 0)) * sortDir);
            }

            return list;
        })()
    );

    function toggleSort(key: "price" | "stock") {
        if (sortKey === key) sortDir = -sortDir;
        else {
            sortKey = key;
            sortDir = 1;
        }
    }

    const PriceIcon = $derived(getSortIcon("price"));
    const StockIcon = $derived(getSortIcon("stock"));

    function getSortIcon(key: "price" | "stock") {
        if (sortKey !== key) return ChevronsUpDown;
        return sortDir === 1 ? ArrowUp : ArrowDown;
    }
</script>

<div class="space-y-4">
    <!-- Search bar -->
    <div class="join w-full md:w-96 shadow-sm">
        <input
            type="text"
            placeholder="Rechercher un article..."
            bind:value={search}
            class="input input-bordered join-item w-full focus:outline-offset-0"
        />
        {#if search}
            <button
                type="button"
                class="btn btn-square join-item"
                onclick={() => (search = "")}
                title="Effacer la recherche"
            >
                <X class="w-5 h-5" />
            </button>
        {/if}
    </div>

    <!-- Results count -->
    <div>
        <p class="text-sm text-base-content/70">
            {filtered.length} article(s) affiché(s)
        </p>
    </div>

    <!-- Table -->
    <div class="card bg-base-100 rounded-xl shadow-sm">
        <div class="card-body p-0 overflow-hidden">
            {#if loading}
                <div class="flex justify-center items-center p-12">
                    <span class="loading loading-spinner loading-lg text-primary"></span>
                </div>
            {:else if filtered.length === 0}
                <div class="flex flex-col items-center justify-center p-12 text-center">
                    <p class="text-lg font-semibold text-base-content/70">
                        {search ? "Aucun article trouvé" : "Aucun article"}
                    </p>
                    <p class="text-sm text-base-content/50 mt-2">
                        {search ? "Essayez une autre recherche" : "Créez votre premier article"}
                    </p>
                </div>
            {:else}
                <div class="overflow-x-auto">
                    <table class="table table-zebra table-pin-rows w-full text-sm md:text-base">
                        <thead>
                            <tr>
                                <th class="text-center w-16">Image</th>
                                <th>Article</th>
                                <th>Catégories</th>
                                <th>
                                    <button
                                        type="button"
                                        class="flex items-center gap-1 hover:text-primary transition-colors"
                                        onclick={() => toggleSort("price")}
                                    >
                                        Prix
                                        <PriceIcon class="w-4 h-4" />
                                    </button>
                                </th>
                                <th>
                                    <button
                                        type="button"
                                        class="flex items-center gap-1 hover:text-primary transition-colors"
                                        onclick={() => toggleSort("stock")}
                                    >
                                        Stock
                                        <StockIcon class="w-4 h-4" />
                                    </button>
                                </th>
                                <th>Mis à jour</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each filtered as article (article.id)}
                                <ArticleCard
                                    {article}
                                    {onEdit}
                                    {onDelete}
                                    {onViewImage}
                                />
                            {/each}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
    </div>
</div>
