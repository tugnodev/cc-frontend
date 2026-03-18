<script>
    import { Search } from "@lucide/svelte";
    import { articles, searchResults } from "$lib/store/articles";

    let query = $state("");

    const handleSearch = () => {
        console.log(query);
        searchResults.set(
            $articles.filter((article) =>
                article.title.toLowerCase().includes(query.toLowerCase()),
            ),
        );

        console.log($searchResults);
    };
</script>

<div class="flex w-full">
    <input
        type="text"
        bind:value={query}
        placeholder="Rechercher un produit..."
        class="input input-bordered flex-1 rounded-l-lg rounded-r-none"
    />
    <button
        class="btn btn-primary rounded-l-none rounded-r-lg"
        onclick={handleSearch}
    >
        <Search class="w-5 h-5" />
    </button>
</div>

<style>
    input:focus {
        border: none;
    }
</style>
