<script lang="ts">
    import { onMount } from "svelte";
    import { X, Plus, RefreshCcw } from "@lucide/svelte";
    import { BackendFetch } from "$lib/backend";
    import { TokenManager } from "$lib/token";

    type Props = {
        categories?: string[];
        onCategoriesChange: (categories: string[]) => void;
        disabled?: boolean;
    };

    let { categories = $bindable([]), onCategoriesChange, disabled = false }: Props = $props();

    const tokenManager = new TokenManager();
    let availableCategories = $state<string[]>([]);
    let loadingCategories = $state(false);
    let categoriesError = $state<string | null>(null);

    let newCategory = $state("");

    async function getBackend() {
        const token = await tokenManager.loadToken();

        if (!token) {
            throw new Error("Utilisateur non authentifié");
        }

        return new BackendFetch(token);
    }

    async function loadCategories() {
        loadingCategories = true;
        categoriesError = null;

        try {
            const backend = await getBackend();
            const response = await backend.get<{ message?: unknown }>("/categories/all");
            const payload = response?.message;

            if (Array.isArray(payload)) {
                availableCategories = payload
                    .map((category) => (typeof category === "string" ? category : category?.name))
                    .filter((category): category is string => typeof category === "string" && category.trim().length > 0);
                return;
            }

            availableCategories = [];
            categoriesError = "Impossible de charger les catégories";
        } catch (error) {
            categoriesError = error instanceof Error ? error.message : "Impossible de charger les catégories";
            availableCategories = [];
        } finally {
            loadingCategories = false;
        }
    }

    function addCategory() {
        if (newCategory && !categories.includes(newCategory)) {
            const updated = [...categories, newCategory];
            categories = updated;
            onCategoriesChange(updated);
            newCategory = "";
        }
    }

    function removeCategory(cat: string) {
        const updated = categories.filter((c) => c !== cat);
        categories = updated;
        onCategoriesChange(updated);
    }

    function getSelectableCategories() {
        return availableCategories.filter((cat) => !categories.includes(cat));
    }

    onMount(() => {
        loadCategories();
    });
</script>

<div class="form-control w-full">
    <label class="label" for="article-categories">
        <span class="label-text font-medium">Catégories</span>
    </label>

    {#if categoriesError}
        <div class="alert alert-warning mb-3">
            <span>{categoriesError}</span>
            <button type="button" class="btn btn-ghost btn-sm" onclick={loadCategories} disabled={loadingCategories}>
                <RefreshCcw class="w-4 h-4" />
                Réessayer
            </button>
        </div>
    {/if}

    <div class="flex gap-2">
        <select
            id="article-categories"
            class="select select-bordered flex-1"
            bind:value={newCategory}
            disabled={disabled || loadingCategories || getSelectableCategories().length === 0}
        >
            <option value="">
                {#if loadingCategories}
                    Chargement des catégories...
                {:else}
                    Sélectionner une catégorie
                {/if}
            </option>
            {#each getSelectableCategories() as cat}
                <option value={cat}>{cat}</option>
            {/each}
        </select>

        <button
            type="button"
            class="btn btn-primary"
            onclick={addCategory}
            disabled={!newCategory || disabled || loadingCategories}
        >
            <Plus class="w-5 h-5" />
        </button>
    </div>

    {#if categories.length > 0}
        <div class="flex flex-wrap gap-2 mt-3">
            {#each categories as cat}
                <div class="badge badge-lg badge-primary gap-2 p-3">
                    <span>{cat}</span>
                    <button
                        type="button"
                        class="btn btn-ghost btn-xs btn-circle"
                        onclick={() => removeCategory(cat)}
                        {disabled}
                    >
                        <X class="w-3 h-3" />
                    </button>
                </div>
            {/each}
        </div>
    {:else}
        <div class="mt-2 text-sm text-base-content/50">
            Aucune catégorie sélectionnée
        </div>
    {/if}
</div>
