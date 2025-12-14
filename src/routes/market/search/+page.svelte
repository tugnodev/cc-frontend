<script>
    import Main from "../../../components/Main.svelte";
    import SearchBar from "../../../components/SearchBar.svelte";
    import ProductByCategory from "../../../components/ProductByCategory.svelte";

    const categories = [
        "Mode",
        "Informatique",
        "Électroménager",
        "Sport",
        "Supermarché",
        "Jeux vidéos & consoles",
    ];
    /**
     * @param {string} query
     */
    function handleSearch(query) {
        alert("Recherche : " + query);
    }
</script>

<Main>
    <SearchBar
        onSearch={handleSearch}
        placeholder="Rechercher vos commandes..."
    />
    <div class="p-6">
        <ProductByCategory {categories} />
    </div>
</Main>
