<script lang="ts">
    import Main from "../../../components/Main.svelte";
    import SearchBar from "../../../components/SearchBar.svelte";
    import ProductByCategory from "../../../components/ProductByCategory.svelte";
    import Filtre from "../../../components/Filtre.svelte";
    import ModalBox from "../../../components/ModalBox.svelte";
    import { articles, searchResults } from "$lib/store/articles";
    import { onMount } from "svelte";
    import type { articleDto } from "$lib/services/dtos/article";

    const categories = [
        "Mode & Cosmétique",
        "Jeux Vidéo & Console",
        "Education",
        "Informatique",
        "Maison & Électronique",
        "Sport",
        "Supermarché",
    ];

    let filterFlag = $state("");
    let filteredArticles = $state<articleDto[]>([]);

    $effect(() => {
        filteredArticles = $searchResults;
    });

    const filterArticles = (query: string) => {
        console.log(searchResults);
        switch (query === filterFlag) {
            case false:
                filterFlag = query;
                filteredArticles = $searchResults.filter(
                    (article) => article.category[0] === query,
                );
                break;
            case true:
                filterFlag = "";
                filteredArticles = $searchResults;
                break;
        }
    };
</script>

<Main>
    <section class="w-full px-2 mt-1 flex flex-col gap-2">
        <SearchBar />

        <div class="flex justify-between items-center w-full">
            <span class="font-semibold text-2xl border-b border-base-300 p-1"
                >Categories</span
            >
            <button class="btn btn-sm btn-soft btn-base-300">Filtrer</button>
        </div>
        <div class="flex flex-wrap gap-2">
            {#each categories as categorie}
                <button
                    onclick={() => filterArticles(categorie)}
                    class={`btn btn-sm ${categorie === filterFlag ? "btn-warning btn-soft" : "btn-ghost border border-base-300"}`}
                    >{categorie}</button
                >
            {/each}
        </div>
    </section>
    <section>
        {#if $searchResults.length > 0}
            <ProductByCategory data={filteredArticles} />
        {:else}
            <div class="flex flex-col items-center justify-center">
                <p class="text-xl font-semibold">Aucun résultat trouvé</p>
                <p class="text-base">Essayez une autre recherche</p>
            </div>
        {/if}
    </section>
</Main>
