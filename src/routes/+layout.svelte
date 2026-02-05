<script>
    let { children } = $props();
    import "../app.css";
</script>

<main class="w-full mt-8 h-screen bg-base-200">
    {@render children()}
</main>
