<script>
    import { fade, slide } from "svelte/transition";

    let { children } = $props();
</script>

<main
    in:slide={{ duration: 300, axis: "y" }}
    out:slide={{ duration: 100, axis: "y" }}
    class="w-full flex flex-col items-center gap-2 justify-start mt-16 mb-32 px-1 transition-all duration-300 ease-in-out"
>
    {@render children()}
</main>
