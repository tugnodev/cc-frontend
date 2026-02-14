<script>
    import { articles } from "$lib/store/articles";
    import ProductCard from "./ProductCard.svelte";
    let { data = [] } = $props();
</script>

<div
    class="w-full flex flex-col justify-start mt-4 px-1 transition-all duration-300 ease-in-out"
>
    <div class="grid grid-cols-2 gap-1">
        {#each data as article (article.id)}
            <ProductCard product={article} />
        {:else}
            <div class="col-span-2 text-center py-10 text-gray-400">
                Aucun article trouvé
            </div>
        {/each}
    </div>
</div>
