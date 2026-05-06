<script lang="ts">
    type Props = {
        image: string;
        onClose: () => void;
    };

    let { image, onClose }: Props = $props();
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-4 max-w-5xl">
    <img
        src={image}
        alt="Preview"
        class="max-w-full max-h-[80vh] rounded-lg shadow-2xl object-contain"
    />
    
    <button
        type="button"
        class="btn btn-primary mt-6 gap-2"
        onclick={onClose}
    >
        Fermer
    </button>
</div>
