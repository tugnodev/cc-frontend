<script>
    let { children } = $props();
</script>

<div
    class="relative z-50 max-w-96 w-full min-h-96 bg-base-200/50 rounded-2xl border border-base-300 backdrop-blur-2xl flex flex-col items-center justify-center"
>
    {@render children()}
</div>
