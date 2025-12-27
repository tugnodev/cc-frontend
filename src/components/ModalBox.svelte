<script lang="ts">
    import { X } from "@lucide/svelte";

    let { children, onClose } = $props();
</script>

<div
    class="absolute max-w-96 w-full min-h-96 max-h-10/12 gap-2 bg-base-200/50 rounded-2xl border border-base-300 backdrop-blur-2xl flex flex-col items-center justify-start"
>
    <div class="w-full flex flex-row-reverse p-1 border-b border-base-300/50">
        <button
            onclick={onClose}
            class="btn btn-md btn-soft btn-square btn-error rounded-full"
        >
            <X />
        </button>
    </div>
    {@render children()}
</div>
