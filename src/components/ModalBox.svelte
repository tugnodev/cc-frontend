<script lang="ts">
    import { X } from "@lucide/svelte";
    import { cubicIn } from "svelte/easing";
    import { blur, fade, fly } from "svelte/transition";

    let { children, onClose } = $props();
</script>

<div
    in:blur={{ amount: 100, duration: 300 }}
    class="absolute inset-0 p-2 bg-base-100/20 backdrop-blur z-50 flex items-center justify-center"
>
    <div
        in:blur={{ duration: 250, delay: 150 }}
        class="absolute max-w-96 w-full min-h-96 max-h-10/12 gap-2 bg-base-200/90 rounded-2xl border border-base-300 backdrop-blur-2xl flex flex-col items-center justify-start"
    >
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
        {@render children()}
    </div>
</div>
