<script>
    // @ts-ignore
    /**
     * @type {any[] | null | undefined}
     */
    export let categories = [];
    // @ts-ignore
    /**
     * @type {null}
     */
    let selectedCategory = null;
</script>

<section>
    <h3 class="text-xl font-semibold mb-4">Catégories</h3>

    <div class="flex flex-wrap gap-3">
        {#each categories as category}
            <button
                class="btn btn-sm
          {selectedCategory === category ? 'btn-primary' : 'btn-outline'}"
                on:click={() => (selectedCategory = category)}
            >
                {category}
            </button>
        {/each}
    </div>

    {#if selectedCategory}
        <div class="mt-4 alert alert-info">
            Catégorie sélectionnée :
            <strong>{selectedCategory}</strong>
        </div>
    {/if}
</section>
