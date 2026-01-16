<script>
    import Navbar from "../../components/navbar.svelte";
    import Header from "../../components/header.svelte";

    let { children } = $props();
    import "../../app.css";
</script>

<main
    class="w-full h-screen items-center mt-8 justify-start flex flex-col fixed z-0 bg-base-200"
>
    <div class="flex absolute z-30 top-0 w-full">
        <Header />
    </div>
    <div class="overflow-scroll no-scrollbar w-full h-full">
        {@render children()}
    </div>
    <div class="flex relative z-30 bottom-14">
        <Navbar />
    </div>
</main>
