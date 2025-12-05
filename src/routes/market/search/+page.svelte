<script>
    import Main from "../../../components/Main.svelte";
    import SearchBar from "../../../components/SearchBar.svelte";

    function handleSearch(query) {
        alert("Recherche : " + query);
    }
</script>

<Main>
    <SearchBar
        onSearch={handleSearch}
        placeholder="Rechercher vos commandes..."
    />
</Main>
