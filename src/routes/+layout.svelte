<script>
    let { children } = $props();
    import "../app.css";
</script>

<main class="w-full fixed mt-8 h-screen overflow-hidden bg-base-200">
    {@render children()}
</main>
