<script>
    /**
     * @type {any[] | null | undefined}
     */
    export let categories = [];
    /**
     * @type {null}
     */
    let selectedCategory = null;

    /**
     * @param {null} category
     */
    function toggleCategory(category) {
        selectedCategory = selectedCategory === category ? null : category;
    }
</script>

<section>
    <h3 class="text-xl font-semibold mb-4">Catégories</h3>

    <div class="flex flex-wrap gap-3">
        {#each categories as category}
            <button
                class="btn btn-sm
          {selectedCategory === category ? 'btn-primary' : 'btn-outline'}"
                on:click={() => toggleCategory(category)}
            >
                {category}
            </button>
        {/each}
    </div>

    {#if selectedCategory}
        <div class="mt-4 alert alert-info">
            Filtre actif :
            <strong>{selectedCategory}</strong>
        </div>
    {/if}
</section>
