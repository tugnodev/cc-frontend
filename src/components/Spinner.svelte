<script>
    import { fade } from "svelte/transition";

    // Utilisation de la rune $props pour récupérer les paramètres
    let {
        size = 40,
        color = "text-orange-600",
        thickness = "border-4",
        speed = "animate-spin",
    } = $props();
</script>

<div
    transition:fade={{ duration: 200 }}
    class="flex max-w-xs items-center justify-center p-4"
>
    <div
        class="{speed} rounded-full border-base-300 {thickness} {color}"
        style="
			width: {size}px;
			height: {size}px;
			border-top-color: transparent;
		"
        role="status"
    >
        <span class="sr-only">Chargement...</span>
    </div>
</div>
