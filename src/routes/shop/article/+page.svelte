<script lang="ts">
    import Main from "../../../components/Main.svelte";
    import Article from "../../../components/Articles.svelte";
</script>

<svelte:head>
    <title>Shop - Articles</title>
</svelte:head>

<Main>
    <div class="w-full py-2">
        <h1 class="text-3xl font-bold">Mes articles</h1>
    </div>
    <Article />
</Main>
