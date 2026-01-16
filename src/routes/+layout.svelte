<script>
    let { children } = $props();
    import "../app.css";
</script>

<main class="w-full h-screen pt-8 bg-base-200">
    {@render children()}
</main>
