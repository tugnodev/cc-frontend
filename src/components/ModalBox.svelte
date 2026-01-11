<script lang="ts">
    import { X } from "@lucide/svelte";
    import { Key } from "lucide";
    import { cubicIn } from "svelte/easing";
    import { blur, fade, fly } from "svelte/transition";

    let { children, onClose } = $props();
</script>

<div
<<<<<<< Updated upstream
    in:blur={{ amount: 15, duration: 250 }}
    class="absolute inset-0 p-4 bg-base-100/20 backdrop-blur z-50 flex items-center justify-center"
=======
    role="button"
    tabindex="0"
    onclick={() => onClose()}
    onkeydown={(e) => {
        if (e.key === "Escape") {
            onClose();
        }
    }}
    in:blur={{ amount: 100, duration: 300 }}
    class="absolute inset-0 p-2 bg-base-100/20 backdrop-blur z-50 w-full h-screen flex items-center justify-center"
>>>>>>> Stashed changes
>
    <div
        in:blur={{ duration: 100, delay: 100 }}
        class="absolute max-w-96 w-full min-h-96 max-h-10/12 gap-2 bg-base-200/90 rounded-2xl border border-base-300 backdrop-blur-2xl flex flex-col items-center justify-start"
    >
<<<<<<< Updated upstream
        <div
            class="w-full flex flex-row-reverse p-1 border-b border-base-300/50"
        >
            <button
                onclick={onClose}
                class="btn btn-md btn-soft btn-square btn-error rounded-full"
            >
                <X />
            </button>
        </div>
        <div class="overflow-scroll w-full h-full">
            {@render children()}
        </div>
=======
        {@render children()}
>>>>>>> Stashed changes
    </div>
</div>
