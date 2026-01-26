<script lang="ts">
    import { X } from "@lucide/svelte";
    import { Key } from "lucide";
    import { cubicIn } from "svelte/easing";
    import { blur, fade, fly } from "svelte/transition";

    let { children, onClose } = $props();
</script>

<div
    role="button"
    tabindex="0"
    onclick={() => onClose()}
    onkeydown={(e) => {
        if (e.key === "Escape") {
            onClose();
        }
    }}
    in:blur={{ amount: 100, duration: 300 }}
    class="fixed inset-0 p-2 bg-base-100/20 backdrop-blur z-30 w-full h-screen flex items-center justify-center"
>
    <div
        role="button"
        tabindex="0"
        onkeydown={(e) => {
            if (e.key === "Escape") {
                onClose();
            }
        }}
        in:blur={{ duration: 250, delay: 150 }}
        onclick={(e) => e.stopPropagation()}
        class="max-w-2xl w-full min-h-96 max-h-[70vh] overflow-scroll no-scrollbar gap-2 bg-base-200/90 rounded-2xl border border-base-300 backdrop-blur-2xl flex flex-col items-center justify-start"
    >
        {@render children()}
    </div>
</div>
