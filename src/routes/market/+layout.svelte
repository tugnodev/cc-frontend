<script>
    import Navbar from "../../components/navbar.svelte";

    let { children } = $props();
    import "../../app.css";
</script>

<main class="w-full h-screen items-center flex flex-col fixed z-0 bg-base-200">
    {@render children()}
    <div class="flex absolute z-30 bottom-6">
        <Navbar />
    </div>
</main>
