<script>
    import Navbar from "../../components/navbar.svelte";
    import Header from "../../components/header.svelte";
    import { page } from "$app/state";

    let { children } = $props();
    import "../../app.css";
    import { Effect } from "@tauri-apps/api/window";
</script>

<main
    class="w-full h-screen items-center justify-start flex flex-col fixed z-0 bg-base-200"
>
    <div class={`flex absolute z-10 top-0 w-full`}>
        <Header />
    </div>
    <div class="overflow-scroll no-scrollbar w-full h-full">
        {@render children()}
    </div>
    <div class="flex absolute z-20 bottom-14">
        <Navbar />
    </div>
</main>
