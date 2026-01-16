<script>
    import NavbarShop from "../../components/navbarShop.svelte";
    import HeaderShop from "../../components/headerShop.svelte";

    let { children } = $props();
    import "../../app.css";
</script>

<main
    class="w-full h-screen items-center justify-start flex flex-col fixed z-0 bg-base-200"
>
    <div class="flex absolute z-30 top-0 w-full">
        <HeaderShop />
    </div>
    <div class="overflow-scroll no-scrollbar w-full h-full">
        {@render children()}
    </div>
    <div class="flex absolute z-30 bottom-6">
        <NavbarShop />
    </div>
</main>
