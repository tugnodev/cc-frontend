<script>
    let { children } = $props();
    import "../app.css";
</script>

<main class="w-full h-screen bg-base-200">
    {@render children()}
</main>
