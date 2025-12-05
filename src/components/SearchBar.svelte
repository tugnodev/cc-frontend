<script>
    import { Search } from "@lucide/svelte";
    export let placeholder = "Rechercher...";
    export let onSearch = (query) => {};

    let query = "";

    function handleSearch() {
        onSearch(query);
    }

    function handleKey(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }
</script>

<div class="flex w-full max-w-md mx-auto">
    <input
        type="text"
        bind:value={query}
        {placeholder}
        class="input input-bordered flex-1 rounded-l-lg rounded-r-none"
        on:keydown={handleKey}
    />
    <button
        class="btn btn-primary rounded-l-none rounded-r-lg"
        on:click={handleSearch}
    >
        <Search class="w-5 h-5" />
    </button>
</div>
