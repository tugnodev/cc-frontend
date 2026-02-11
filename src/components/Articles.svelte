<script lang="ts">
    import { onMount } from "svelte";
    import ModalBox from "./ModalBox.svelte";
    import type { articleDto } from "../services/dtos/article";
    import { userArticles as articleStore } from "../store/articles";
    import {
        X,
        Pencil,
        Trash2,
        Plus,
        ArrowUp,
        ArrowDown,
        ChevronsUpDown,
        Image as ImageIcon,
    } from "@lucide/svelte";

    //import { backendFetch } from "../lib/backend";
    //import { users } from "../store/users";

    /*/ Simple token getter from localStorage
  function getToken(): string {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || "";
    }
    return "";
  }*/

    type EventHandler = (type: string, detail?: any) => void;
    const dispatch: EventHandler = (type, detail) => {
        try {
            window.dispatchEvent(new CustomEvent(type, { detail }));
        } catch {
            //
        }
    };

    //let service: backendFetch | null = null;
    //let currentUser: any = null;
    let articles: articleDto[] = [];
    let filtered: articleDto[] = [];
    let loading = false;
    let error: string | null = null;
    let success: string | null = null;

    // UI state
    let search = "";
    let sortKey: "price" | "stock" | null = null;
    let sortDir = 1; // 1 = asc, -1 = desc

    // Subscribe to articles store
    articleStore.subscribe((data) => {
        articles = data;
        applyFilters();
    });

    // Modal / form
    let showForm = false;
    let isEditing = false;
    let form: Partial<articleDto> = {
        title: "",
        description: "",
        price: 0,
        stock: 0,
        images: [],
        category: [],
    };

    // Image handling
    let fileInput: HTMLInputElement;
    let previewImages: string[] = [];
    let uploading = false;
    let imagePreviewModal = false;
    let selectedImagePreview: string | null = null;

    // Category handling
    let newCategory = "";
    const allCategories = [
        "Informatique",
        "Mode",
        "Electroménager",
        "Jeux vidéos & consoles",
        "Sport",
        "Autre",
    ];

    // Confirmation
    let toDelete: articleDto | null = null;

    // Helpers to manipulate the articles store locally
    function addArticle(a: articleDto) {
        articleStore.update((arr) => [a, ...arr]);
    }

    function updateArticle(id: string, updated: articleDto) {
        articleStore.update((arr) => arr.map((it) => (it.id === id ? { ...it, ...updated } : it)));
    }

    function removeArticle(id: string) {
        articleStore.update((arr) => arr.filter((it) => it.id !== id));
    }

    async function load() {
        loading = true;
        error = null;
        try {
            // Les articles sont déjà chargés du store
            applyFilters();
        } catch (e) {
            error =
                e instanceof Error ? e.message : "Erreur lors du chargement";
            console.error("Erreur load:", e);
        } finally {
            loading = false;
        }
    }

    function applyFilters() {
        const q = search.trim().toLowerCase();
        filtered = articles.filter(
            (a) =>
                !q ||
                a.title.toLowerCase().includes(q) ||
                (a.description || "").toLowerCase().includes(q),
        );
        if (sortKey) {
            const key = sortKey as "price" | "stock";
            filtered = filtered
                .slice()
                .sort((a, b) => ((a[key] ?? 0) - (b[key] ?? 0)) * sortDir);
        }
    }

    function toggleSort(key: "price" | "stock") {
        if (sortKey === key) sortDir = -sortDir;
        else {
            sortKey = key;
            sortDir = 1;
        }
        applyFilters();
    }

    function openCreate() {
        isEditing = false;
        form = {
            title: "",
            description: "",
            price: 0,
            stock: 0,
            images: [],
            category: [],
        };
        previewImages = [];
        newCategory = "";
        showForm = true;
    }

    function openEdit(a: articleDto) {
        isEditing = true;
        form = { ...a };
        previewImages = [...(a.images || [])];
        newCategory = "";
        showForm = true;
    }

    function validateForm(): string | null {
        if (!form.title || form.title.trim() === "")
            return "Le titre est requis";
        if (!form.price || form.price <= 0)
            return "Le prix doit être supérieur à 0";
        if (form.stock == null || form.stock < 0)
            return "Le stock ne peut pas être négatif";
        //if (!currentUser?.id) return "Utilisateur non identifié";
        return null;
    }

    function addCategory() {
        if (newCategory && !form.category?.includes(newCategory)) {
            form.category = [...(form.category || []), newCategory];
            newCategory = "";
        }
    }

    function removeCategory(cat: string) {
        form.category = (form.category || []).filter((c) => c !== cat);
    }

    async function submit() {
        error = null;
        success = null;

        const validation = validateForm();
        if (validation) {
            error = validation;
            return;
        }

        try {
            //if (!service) throw new Error("Service non initialisé");
            const formData = {
                title: form.title,
                description: form.description,
                price: form.price,
                stock: form.stock,
                images: previewImages,
                category: form.category || [],
                //userId: currentUser?.id,
            };

            if (isEditing && form.id) {
                const updated = { ...form } as articleDto;
                updateArticle(form.id, updated);
                success = "Article mis à jour avec succès";
            } else {
                const newArticle: articleDto = {
                    id: `art-${Date.now()}`,
                    userId: "current-user",
                    title: form.title || "",
                    description: form.description || "",
                    price: form.price || 0,
                    stock: form.stock || 0,
                    images: previewImages,
                    category: form.category || [],
                    rates: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                addArticle(newArticle);
                success = "Article créé avec succès";
            }

            showForm = false;
            setTimeout(() => {
                success = null;
            }, 3000);
            applyFilters();
            dispatch("change");
        } catch (e) {
            error =
                e instanceof Error ? e.message : "Erreur lors de la sauvegarde";
            console.error("Erreur submit:", e);
        }
    }

    function confirmDelete(a: articleDto) {
        toDelete = a;
    }

    async function doDelete() {
        if (!toDelete) return;
        try {
            removeArticle(toDelete.id);
            toDelete = null;
            success = "Article supprimé avec succès";
            setTimeout(() => {
                success = null;
            }, 3000);
            applyFilters();
            dispatch("change");
        } catch (e) {
            error =
                e instanceof Error
                    ? e.message
                    : "Erreur lors de la suppression";
            console.error("Erreur delete:", e);
        }
    }

    // Image handling functions
    async function handleImageUpload(e: Event) {
        uploading = true;
        const input = e.target as HTMLInputElement;
        const files = input.files ? Array.from(input.files) : [];

        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                previewImages = [...previewImages, base64];
            };
            reader.readAsDataURL(file);
        }

        uploading = false;
        input.value = "";
    }

    function removeImage(index: number) {
        previewImages = previewImages.filter((_, i) => i !== index);
    }

    function openImagePreview(image: string) {
        selectedImagePreview = image;
        imagePreviewModal = true;
    }

    // reactive: run whenever dependencies used by applyFilters change
    $: {
        search;
        sortKey;
        sortDir;
        applyFilters();
    }

    /*/ Alertes de succès/erreur
  $: if (success) { alert("Succès : " + success); }
  $: if (error) { alert("Erreur : " + error); } */

    function formatPrice(n: number) {
        return n.toLocaleString("fr-SN", {
            style: "currency",
            currency: "XOF",
        });
    }

    onMount(() => {
        load();
    });
</script>

<div class="min-h-screen bg-base-200 p-4 md:p-8 w-full">
    {#if success}
        <div class="alert alert-success mb-4 shadow-lg">
            <div class="flex items-center gap-2">
                <span>✓</span>
                <span>{success}</span>
            </div>
        </div>
    {/if}
    {#if error}
        <div class="alert alert-error mb-4 shadow-lg">
            <div class="flex items-center gap-2">
                <span>✕</span>
                <span>{error}</span>
            </div>
        </div>
    {/if}

    <div
        class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4"
    >
        <div>
            <p class="text-sm text-base-content/70">
                {filtered.length} article(s) affiché(s)
            </p>
        </div>

        <div class="flex gap-3 w-full md:w-auto">
            <div class="join w-full md:w-auto shadow-sm">
                <input
                    type="text"
                    placeholder="Rechercher un article..."
                    bind:value={search}
                    class="input input-bordered join-item w-full md:w-64 focus:outline-offset-0"
                />
                {#if search}
                    <button
                        class="btn btn-square join-item btn-ghost border-base-300"
                        on:click={() => {
                            search = "";
                        }}
                        title="Effacer la recherche"
                    >
                        <X class="w-5 h-5" />
                    </button>
                {/if}
            </div>

            <button
                class="btn btn-primary shadow-sm gap-2"
                on:click={openCreate}
            >
                <Plus class="w-5 h-5" />
                <span class="hidden md:inline">Nouvel article</span>
            </button>
        </div>
    </div>

    <div class="card bg-base-100 rounded-xl shadow-sm">
        <div class="card-body p-0 overflow-hidden">
            {#if loading}
                <div class="flex justify-center items-center p-12">
                    <span
                        class="loading loading-spinner loading-lg text-primary"
                    ></span>
                </div>
            {:else}
                <div class="overflow-x-auto">
                    <table
                        class="table table-zebra table-pin-rows w-full text-sm md:text-base"
                    >
                        <thead
                            class="bg-base-200/50 text-base-content/80 uppercase text-xs font-semibold"
                        >
                            <tr>
                                <th class="py-2 md:py-4 pl-2 md:pl-6 text-left"
                                    >Nom</th
                                >

                                <th
                                    class="cursor-pointer hover:bg-base-200 hover:text-primary transition-colors text-right py-2 md:py-4 px-1 md:px-2"
                                    on:click={() => toggleSort("price")}
                                >
                                    <div
                                        class="flex items-center justify-end gap-0.5 md:gap-1"
                                    >
                                        <span>Prix</span>
                                        {#if sortKey === "price"}
                                            {#if sortDir === 1}<ArrowUp
                                                    class="w-4 h-4"
                                                />{:else}<ArrowDown
                                                    class="w-4 h-4"
                                                />{/if}
                                        {:else}
                                            <ChevronsUpDown
                                                class="w-4 h-4 opacity-50"
                                            />
                                        {/if}
                                    </div>
                                </th>

                                <th
                                    class="cursor-pointer hover:bg-base-200 hover:text-primary transition-colors text-center py-2 md:py-4 px-1 md:px-2"
                                    on:click={() => toggleSort("stock")}
                                >
                                    <div
                                        class="flex items-center justify-center gap-0.5 md:gap-1"
                                    >
                                        <span>Stock</span>
                                        {#if sortKey === "stock"}
                                            {#if sortDir === 1}<ArrowUp
                                                    class="w-4 h-4"
                                                />{:else}<ArrowDown
                                                    class="w-4 h-4"
                                                />{/if}
                                        {:else}
                                            <ChevronsUpDown
                                                class="w-4 h-4 opacity-50"
                                            />
                                        {/if}
                                    </div>
                                </th>
                                <th
                                    class="text-center py-2 md:py-4 pr-2 md:pr-6"
                                    >Actions</th
                                >
                            </tr>
                        </thead>
                        <tbody>
                            {#if filtered.length === 0}
                                <tr>
                                    <td
                                        colspan="4"
                                        class="text-center py-8 md:py-12 text-base-content/60 italic"
                                    >
                                        Aucun article ne correspond à votre
                                        recherche.
                                    </td>
                                </tr>
                            {:else}
                                {#each filtered as a (a.id)}
                                    <tr
                                        class="hover:bg-base-200/30 transition-colors"
                                    >
                                        <td class="pl-2 md:pl-6 py-2 md:py-3">
                                            <div
                                                class="font-bold text-base-content text-sm"
                                            >
                                                {a.title}
                                            </div>
                                            {#if a.description}
                                                <div
                                                    class="text-xs opacity-60 max-w-xs truncate hidden md:block"
                                                    title={a.description}
                                                >
                                                    {a.description}
                                                </div>
                                            {/if}
                                        </td>

                                        <td
                                            class="text-right font-mono font-medium py-2 md:py-3 px-1 md:px-2 text- md:text-sm"
                                        >
                                            {formatPrice(a.price)}
                                        </td>

                                        <td class="text-center font-semibold">
                                            {#if a.stock === 0}
                                                <div
                                                    class="text-error badge-outline gap-1 text-sm"
                                                >
                                                    <span
                                                        class="hidden sm:inline"
                                                        >Épuisé</span
                                                    >
                                                    <span class="sm:hidden"
                                                        >0</span
                                                    >
                                                </div>
                                            {:else if a.stock < 10}
                                                <div
                                                    class="text-warning badge-warning gap-1"
                                                >
                                                    {a.stock}
                                                    <span
                                                        class="hidden lg:inline ml-1 text-xs opacity-70"
                                                        >(Faible)</span
                                                    >
                                                </div>
                                            {:else}
                                                <span
                                                    class="text-success text-sm"
                                                >
                                                    {a.stock}
                                                </span>
                                            {/if}
                                        </td>

                                        <td class="pr-3 md:pr-6 py-2 md:py-3">
                                            <div
                                                class="flex justify-center gap-0.75"
                                            >
                                                <div
                                                    class="md:hidden flex gap-1"
                                                >
                                                    <div
                                                        class="tooltip"
                                                        data-tip="Modifier"
                                                    >
                                                        <button
                                                            class="btn btn-sm btn-square btn-ghost hover:bg-primary/10 hover:text-primary"
                                                            on:click={() =>
                                                                openEdit(a)}
                                                        >
                                                            <Pencil
                                                                class="w-5 h-5"
                                                            />
                                                        </button>
                                                    </div>
                                                    <div
                                                        class="tooltip"
                                                        data-tip="Supprimer"
                                                    >
                                                        <button
                                                            class="btn btn-sm btn-square btn-ghost text-error hover:bg-error/10"
                                                            on:click={() =>
                                                                confirmDelete(
                                                                    a,
                                                                )}
                                                        >
                                                            <Trash2
                                                                class="w-5 h-5"
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div
                                                    class="hidden md:flex gap-2"
                                                >
                                                    <button
                                                        class="btn btn-sm btn-primary"
                                                        on:click={() =>
                                                            openEdit(a)}
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        class="btn btn-sm btn-error"
                                                        on:click={() =>
                                                            confirmDelete(a)}
                                                    >
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>
            {/if}
        </div>
    </div>

    {#if showForm}
        <ModalBox onClose={() => (showForm = false)}>
                {#if error}
                    <div class="alert alert-error mt-4 shadow-lg">{error}</div>
                {/if}
                <div class="sm:max-w-lg w-full p-4">
                    <h3 class="font-bold text-xl mb-4 flex items-center gap-2">
                        {#if isEditing}<Pencil class="w-6 h-6 text-primary" />
                        {:else}<Plus class="w-6 h-6 text-primary" />
                        {/if}
                        {isEditing
                            ? "Modifier l'article"
                            : "Créer un nouvel article"}
                    </h3>

                    <div class="flex flex-col gap-3">
                        <!-- Image Upload Section -->
                        <div class="form-control">
                            <label class="label" for="images"
                                ><span class="label-text font-medium"
                                    >Images du produit</span
                                ></label
                            >
                            <div class="flex flex-wrap gap-2 mb-2">
                                {#if previewImages.length > 0}
                                    {#each previewImages as image, index}
                                        <div
                                            class="relative w-20 h-20 rounded-lg overflow-hidden border border-base-300"
                                        >
                                            <button
                                                type="button"
                                                class="w-full h-full object-cover cursor-pointer p-0 border-0"
                                                on:click={() =>
                                                    openImagePreview(image)}
                                                title="Afficher l'image"
                                            >
                                                <img
                                                    src={image}
                                                    alt="preview {index}"
                                                    class="w-full h-full object-cover"
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                class="absolute top-1 right-1 btn btn-xs btn-circle btn-error"
                                                on:click={() =>
                                                    removeImage(index)}
                                                title="Supprimer l'image"
                                            >
                                                <X class="w-3 h-3" />
                                            </button>
                                        </div>
                                    {/each}
                                {/if}
                                <button
                                    type="button"
                                    class="w-20 h-20 rounded-lg border-2 border-dashed border-base-300 flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
                                    on:click={() => fileInput.click()}
                                    disabled={uploading}
                                >
                                    {#if uploading}
                                        <span
                                            class="loading loading-spinner loading-sm"
                                        ></span>
                                    {:else}
                                        <ImageIcon class="w-6 h-6" />
                                    {/if}
                                </button>
                            </div>
                            <input
                                id="images"
                                type="file"
                                multiple
                                accept="image/*"
                                bind:this={fileInput}
                                on:change={handleImageUpload}
                                class="hidden"
                            />
                            <p class="text-xs text-base-content/50 mt-1">
                                Cliquez pour ajouter des images (PNG, JPG, etc.)
                            </p>
                        </div>

                        <div class="form-control">
                            <label class="label" for="name"
                                ><span class="label-text font-medium"
                                    >Nom du produit *</span
                                ></label
                            > <br />
                            <input
                                id="name"
                                class="input input-bordered focus:input-primary"
                                placeholder="Ex: Laptop X1"
                                bind:value={form.title}
                            />
                        </div>
                        <div class="form-control">
                            <label class="label" for="description"
                                ><span class="label-text font-medium"
                                    >Description</span
                                ></label
                            > <br />
                            <textarea
                                id="description"
                                class="textarea textarea-bordered h-24 focus:textarea-primary"
                                placeholder="Courte description..."
                                bind:value={form.description}
                            ></textarea>
                        </div>

                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-control">
                                <label class="label" for="price"
                                    ><span class="label-text font-medium"
                                        >Prix (F CFA) *</span
                                    ></label
                                >
                                <label class="input-group">
                                    <input
                                        id="price"
                                        type="number"
                                        class="input input-bordered w-full focus:input-primary"
                                        placeholder="0.00"
                                        bind:value={form.price}
                                        step="0.01"
                                        min="0"
                                    />
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label" for="stock"
                                    ><span class="label-text font-medium"
                                        >Stock initial *</span
                                    ></label
                                >
                                <input
                                    id="stock"
                                    type="number"
                                    class="input input-bordered focus:input-primary"
                                    placeholder="0"
                                    bind:value={form.stock}
                                    min="0"
                                />
                            </div>
                        </div>

                        <!-- Categories -->
                        <div class="form-control">
                            <label class="label" for="categories"
                                ><span class="label-text font-medium"
                                    >Catégories</span
                                ></label
                            >
                            <div class="flex gap-2 mb-2">
                                <select
                                    id="categories"
                                    bind:value={newCategory}
                                    class="select select-bordered select-sm flex-1"
                                >
                                    <option value=""
                                        >Ajouter une catégorie</option
                                    >
                                    {#each allCategories as cat}
                                        <option value={cat}>{cat}</option>
                                    {/each}
                                </select>
                                <button
                                    type="button"
                                    class="btn btn-sm btn-primary"
                                    on:click={addCategory}
                                    disabled={!newCategory}
                                >
                                    +
                                </button>
                            </div>
                            {#if form.category && form.category.length > 0}
                                <div class="flex flex-wrap gap-2">
                                    {#each form.category as cat}
                                        <div class="badge badge-primary gap-1">
                                            <span>{cat}</span>
                                            <button
                                                type="button"
                                                class="btn btn-xs btn-ghost"
                                                on:click={() =>
                                                    removeCategory(cat)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="modal-action mt-6">
                        <button
                            class="btn btn-ghost"
                            on:click={() => (showForm = false)}>Annuler</button
                        >
                        <button
                            class="btn btn-primary px-6"
                            disabled={!form.title}
                            on:click={submit}
                        >
                            {isEditing
                                ? "Enregistrer les modifications"
                                : "Créer l'article"}
                        </button>
                    </div>
                </div>
        </ModalBox>
    {/if}

    {#if toDelete}
        <ModalBox onClose={() => (toDelete = null)}>
                <div class="w-full p-4">
                    <h3
                        class="font-bold text-lg text-error flex items-center gap-2"
                    >
                        <Trash2 class="w-6 h-6" />
                        Confirmation de suppression
                    </h3>
                    <div class="py-4">
                        <p>
                            Voulez-vous vraiment supprimer définitivement
                            l'article :
                        </p>
                        <p
                            class="mt-2 p-3 bg-base-200 rounded-lg font-medium text-center"
                        >
                            {toDelete?.title}
                        </p>
                        <p class="text-sm text-base-content/70 mt-4">
                            Cette action est irréversible.
                        </p>
                    </div>
                    <div class="modal-action">
                        <button
                            class="btn btn-ghost"
                            on:click={() => (toDelete = null)}>Annuler</button
                        >
                        <button class="btn btn-error px-6" on:click={doDelete}
                            >Confirmer la suppression</button
                        >
                    </div>
                </div>
        </ModalBox>
    {/if}

    {#if imagePreviewModal && selectedImagePreview}
        <ModalBox
            onClose={() => {
                imagePreviewModal = false;
                selectedImagePreview = null;
            }}
        >
                <div
                    class="w-full h-full flex flex-col items-center justify-center p-4"
                >
                    <img
                        src={selectedImagePreview}
                        alt="preview"
                        class="max-w-full max-h-[70vh] rounded-lg"
                    />
                    <button
                        class="btn btn-primary mt-4"
                        on:click={() => {
                            imagePreviewModal = false;
                            selectedImagePreview = null;
                        }}>Fermer</button
                    >
                </div>
        </ModalBox>
    {/if}
</div>
