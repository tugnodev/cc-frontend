<script>
    let { children } = $props();
    import "../../app.css";
</script>

<main
    class="w-full h-full overflow-y-scroll flex flex-col gap-0 justify-start items-center bg-base-200"
>
    <div class="w-full flex items-center justify-center md:h-64">
        <img src="/favicon.svg" class="max-w-auto h-48" alt="" />
    </div>
    <div class="w-full min-h-full overflow-scroll">
        {@render children()}
    </div>
</main>
