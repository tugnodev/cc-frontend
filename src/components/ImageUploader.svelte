<script lang="ts">
    import { X, Image as ImageIcon } from "@lucide/svelte";
    import { supabase } from "$lib/supabaseClient";

    type Props = {
        images?: string[];
        onImagesChange: (images: string[]) => void;
        disabled?: boolean;
    };

    let { images = $bindable([]), onImagesChange, disabled = false }: Props = $props();
    
    let uploading = $state(false);
    let error = $state<string | null>(null);
    let fileInput = $state<HTMLInputElement | undefined>(undefined);

    async function uploadToStorage(file: File): Promise<string> {
        const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name.replace(/\s+/g, "_")}`;
        const bucket = "articles";

        const res: any = await supabase.storage
            .from(bucket)
            .upload(filename, file, {
                cacheControl: "3600",
                upsert: false,
            });
        
        if (res.error) throw res.error;

        const path =
            res && (res as any).data && (res as any).data.path
                ? String((res as any).data.path)
                : filename;

        // Try to get a public URL
        try {
            const publicRes: any = supabase.storage
                .from(bucket)
                .getPublicUrl(path as unknown as string);
            const publicUrl =
                publicRes?.data?.publicUrl ??
                publicRes?.data?.publicURL ??
                publicRes?.publicURL ??
                publicRes?.publicUrl;
            if (publicUrl) return publicUrl;
        } catch (e) {
            // ignore and try signed url
        }

        // Fallback: signed URL for 7 days
        const signedRes: any = await supabase.storage
            .from(bucket)
            .createSignedUrl(path as unknown as string, 60 * 60 * 24 * 7);
        
        if (signedRes.error) throw signedRes.error;
        return signedRes?.data?.signedUrl ?? signedRes?.signedUrl ?? path;
    }

    async function handleImageUpload(e: Event) {
        uploading = true;
        error = null;
        const input = e.target as HTMLInputElement;
        const files = input.files ? Array.from(input.files) : [];

        try {
            const newImages = [...images];
            for (const file of files) {
                try {
                    const url = await uploadToStorage(file);
                    newImages.push(url);
                } catch (err) {
                    console.error("Upload error:", err);
                    error = err instanceof Error ? err.message : String(err);
                }
            }
            images = newImages;
            onImagesChange(newImages);
        } finally {
            uploading = false;
            if (input) input.value = "";
        }
    }

    function removeImage(index: number) {
        const newImages = images.filter((_, i) => i !== index);
        images = newImages;
        onImagesChange(newImages);
    }
</script>

<div class="form-control w-full">
    <label class="label" for="article-images-input">
        <span class="label-text font-medium">Images</span>
    </label>

    <input
        id="article-images-input"
        type="file"
        class="file-input file-input-bordered w-full"
        accept="image/*"
        multiple
        bind:this={fileInput}
        onchange={handleImageUpload}
        {disabled}
    />

    {#if uploading}
        <div class="mt-2 flex items-center gap-2 text-sm text-primary">
            <span class="loading loading-spinner loading-sm"></span>
            <span>Upload en cours...</span>
        </div>
    {/if}

    {#if error}
        <div class="alert alert-error mt-2 text-sm p-2">
            <span>{error}</span>
        </div>
    {/if}

    {#if images.length > 0}
        <div class="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
            {#each images as image, i}
                <div class="relative group aspect-square">
                    <img
                        src={image}
                        alt="Preview {i + 1}"
                        class="w-full h-full object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        class="btn btn-circle btn-xs btn-error absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onclick={() => removeImage(i)}
                        {disabled}
                    >
                        <X class="w-3 h-3" />
                    </button>
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-base-300 rounded-lg mt-2">
            <ImageIcon class="w-8 h-8 text-base-content/30 mb-2" />
            <p class="text-sm text-base-content/50">Aucune image ajoutée</p>
        </div>
    {/if}
</div>
