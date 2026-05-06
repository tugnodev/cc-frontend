<script lang="ts">
    import { Pencil, Plus, Save, X } from "@lucide/svelte";
    import ImageUploader from "./ImageUploader.svelte";
    import CategorySelector from "./CategorySelector.svelte";
    import type { articleDto } from "$lib/services/dtos/article";

    type Props = {
        article?: articleDto | null;
        onSubmit: (article: {
            title: string;
            description: string;
            price: number;
            stock: number;
            images: string[];
            category: string[];
        }) => Promise<void>;
        onCancel: () => void;
        loading?: boolean;
    };

    let { article = null, onSubmit, onCancel, loading = false }: Props = $props();

    const isEditing = $derived(!!article?.id);

    let form = $state({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        images: [] as string[],
        category: [] as string[],
    });

    let error = $state<string | null>(null);
    let submitting = $state(false);

    // Sync with article prop changes
    $effect(() => {
        if (article) {
            form.title = article.title || "";
            form.description = article.description || "";
            form.price = article.price || 0;
            form.stock = article.stock || 0;
            form.images = article.images || [];
            form.category = article.category || [];
        } else {
            form.title = "";
            form.description = "";
            form.price = 0;
            form.stock = 0;
            form.images = [];
            form.category = [];
        }
    });

    function validateForm(): string | null {
        if (!form.title || form.title.trim() === "") return "Le titre est requis";
        if (!form.price || form.price <= 0) return "Le prix doit être supérieur à 0";
        if (form.stock == null || form.stock < 0) return "Le stock ne peut pas être négatif";
        if (!form.images || form.images.length === 0) return "Au moins une image est requise";
        if (!form.category || form.category.length === 0) return "Au moins une catégorie est requise";
        return null;
    }

    async function handleSubmit() {
        error = null;
        const validation = validateForm();
        
        if (validation) {
            error = validation;
            return;
        }

        submitting = true;
        try {
            await onSubmit(form);
        } catch (e) {
            error = e instanceof Error ? e.message : "Erreur lors de la sauvegarde";
        } finally {
            submitting = false;
        }
    }

    function handleImagesChange(images: string[]) {
        form.images = images;
    }

    function handleCategoriesChange(categories: string[]) {
        form.category = categories;
    }
</script>

<div class="sm:max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto">
    <h3 class="font-bold text-2xl mb-6 flex items-center gap-2">
        {#if isEditing}
            <Pencil class="w-6 h-6 text-primary" />
            Modifier l'article
        {:else}
            <Plus class="w-6 h-6 text-primary" />
            Nouvel article
        {/if}
    </h3>

    {#if error}
        <div class="alert alert-error mb-4 shadow-lg">
            <div class="flex items-center gap-2">
                <span>✕</span>
                <span>{error}</span>
            </div>
        </div>
    {/if}

    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-5">
        <!-- Title -->
        <div class="form-control w-full">
            <label class="label" for="article-title">
                <span class="label-text font-medium">Titre *</span>
            </label>
            <input
                id="article-title"
                type="text"
                placeholder="Ex: iPhone 13 Pro"
                class="input input-bordered w-full"
                bind:value={form.title}
                disabled={loading || submitting}
                required
            />
        </div>

        <!-- Description -->
        <div class="form-control w-full">
            <label class="label" for="article-description">
                <span class="label-text font-medium">Description</span>
            </label>
            <textarea
                id="article-description"
                placeholder="Décrivez votre article..."
                class="textarea textarea-bordered h-24 w-full resize-none"
                bind:value={form.description}
                disabled={loading || submitting}
            ></textarea>
        </div>

        <!-- Price & Stock -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control w-full">
                <label class="label" for="article-price">
                    <span class="label-text font-medium">Prix (XOF) *</span>
                </label>
                <input
                    id="article-price"
                    type="number"
                    placeholder="0"
                    class="input input-bordered w-full"
                    bind:value={form.price}
                    min="0"
                    step="100"
                    disabled={loading || submitting}
                    required
                />
            </div>

            <div class="form-control w-full">
                <label class="label" for="article-stock">
                    <span class="label-text font-medium">Stock *</span>
                </label>
                <input
                    id="article-stock"
                    type="number"
                    placeholder="0"
                    class="input input-bordered w-full"
                    bind:value={form.stock}
                    min="0"
                    disabled={loading || submitting}
                    required
                />
            </div>
        </div>

        <!-- Categories -->
        <CategorySelector
            bind:categories={form.category}
            onCategoriesChange={handleCategoriesChange}
            disabled={loading || submitting}
        />

        <!-- Images -->
        <ImageUploader
            bind:images={form.images}
            onImagesChange={handleImagesChange}
            disabled={loading || submitting}
        />

        <!-- Actions -->
        <div class="flex gap-3 pt-4">
            <button
                type="submit"
                class="btn btn-primary flex-1 gap-2"
                disabled={loading || submitting}
            >
                {#if submitting}
                    <span class="loading loading-spinner loading-sm"></span>
                {:else}
                    <Save class="w-5 h-5" />
                {/if}
                {isEditing ? "Mettre à jour" : "Créer"}
            </button>

            <button
                type="button"
                class="btn btn-ghost gap-2"
                onclick={onCancel}
                disabled={loading || submitting}
            >
                <X class="w-5 h-5" />
                Annuler
            </button>
        </div>
    </form>
</div>
