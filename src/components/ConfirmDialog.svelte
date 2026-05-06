<script lang="ts">
    import { AlertTriangle } from "@lucide/svelte";

    type Props = {
        title: string;
        message: string;
        confirmText?: string;
        cancelText?: string;
        onConfirm: () => void;
        onCancel: () => void;
        loading?: boolean;
        danger?: boolean;
    };

    let { 
        title, 
        message, 
        confirmText = "Confirmer", 
        cancelText = "Annuler",
        onConfirm,
        onCancel,
        loading = false,
        danger = false
    }: Props = $props();
</script>

<div class="w-full max-w-md p-6">
    <h3 class="font-bold text-lg flex items-center gap-2" class:text-error={danger}>
        {#if danger}
            <AlertTriangle class="w-6 h-6" />
        {/if}
        {title}
    </h3>

    <div class="py-4">
        <p class="text-base-content/80">{message}</p>
    </div>

    <div class="flex gap-3 justify-end">
        <button
            type="button"
            class="btn btn-ghost"
            onclick={onCancel}
            disabled={loading}
        >
            {cancelText}
        </button>

        <button
            type="button"
            class="btn"
            class:btn-error={danger}
            class:btn-primary={!danger}
            onclick={onConfirm}
            disabled={loading}
        >
            {#if loading}
                <span class="loading loading-spinner loading-sm"></span>
            {/if}
            {confirmText}
        </button>
    </div>
</div>
