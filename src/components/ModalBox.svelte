<script>
    let { children } = $props();
</script>

<div
    class="w-96 h-96 bg-base-200/90 rounded-2xl border border-base-300 backdrop-blur-2xl"
>
    {@render children()}
</div>
