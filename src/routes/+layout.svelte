<script>
    import "../app.css";

    let { children } = $props();
</script>

<main class="w-full fixed mt-8 h-screen overflow-hidden bg-base-200">
    {@render children()}
</main>
