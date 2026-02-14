<script lang="ts">
    import Navbar from "../../components/navbar.svelte";
    import Header from "../../components/header.svelte";
    import { page } from "$app/state";

    let { children } = $props();
    import "../../app.css";
    import { get } from "svelte/store";
    import { articles, ArticlesStore } from "$lib/store/articles";
    import { BackendFetch } from "$lib/backend";
    import { type articleDto } from "$lib/services/dtos/article";
    import { onMount } from "svelte";

    let loading = $state(true);

    onMount(async () => {
        const articleStore = new ArticlesStore();
        const data = await articleStore.load();
        switch (typeof data) {
            case "object":
                articles.set(data);
                loading = false;
                break;
            case "string":
                console.log("initializing...");
                const fetch = new BackendFetch();
                console.log("fetching...");
                const res = (await fetch.get<articleDto[]>(
                    "/articles/all",
                )) as articleDto[];
                console.log(res);
                if (res !== null && res.length > 0) {
                    await articleStore.save(res).catch((e) => "failed!");
                }
                articles.set(res);
                loading = false;
                await articleStore.clear().catch((e) => "failed!");
                await articleStore.save(res).catch((e) => "failed!");
                return { success: "success!" };
            default:
                window.location.reload();
                break;
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
