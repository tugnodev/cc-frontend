<script>
    import Main from "../../../components/Main.svelte";
    import SearchBar from "../../../components/SearchBar.svelte";
    import ProductByCategory from "../../../components/ProductByCategory.svelte";
    import Filtre from "../../../components/Filtre.svelte";

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
    function handleSort() {
        console.log("Trier cliqué depuis la page");
    }

    function handleFilter() {
        console.log("Filtres cliqué depuis la page");
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

    <Filtre on:sort={handleSort} on:filter={handleFilter} />
</Main>
