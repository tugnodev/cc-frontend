<script lang="ts">
    import Navbar from "../../components/navbar.svelte";
    import Header from "../../components/header.svelte";

    let { children } = $props();
    import "../../app.css";
    import { articles } from "$lib/store/articles";
    import { BackendFetch } from "$lib/backend";
    import { type articleDto } from "$lib/services/dtos/article";
    import { onMount } from "svelte";

    let loading = $state(true);

    onMount(async () => {
        if ($articles.length > 0) {
            loading = false;
        } else {
            const fetch = new BackendFetch();
            const res = (await fetch.get<articleDto[]>(
                "/articles/all",
            )) as articleDto[];
            articles.set(res);
            loading = false;
        }
    });
</script>

<main
    class="w-full h-screen items-center justify-start flex flex-col fixed z-0 bg-base-200"
>
    <div class={`flex flex-col absolute z-10 top-0 w-full`}>
        <Header />
    </div>
    <div class="overflow-scroll no-scrollbar w-full h-full">
        {#if loading}
            <div class="flex justify-center w-full items-center h-full">
                <div
                    class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                >
                    <span class="sr-only">Loading...</span>
                </div>
                <div class="ml-4 text-lg font-semibold">Loading...</div>
            </div>
        {:else}
            {@render children()}
        {/if}
    </div>
    <div class="flex absolute z-20 bottom-14">
        <Navbar />
    </div>
</main>
