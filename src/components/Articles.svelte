<script lang="ts">
    import { onMount } from "svelte";
    import { X, Pencil, Trash2, Plus, ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-svelte';
    import type { Article } from "../services/articleService";
    import * as service from "../services/articleService";
    import ModalBox from "./ModalBox.svelte";

    type EventHandler = (type: string, detail?: any) => void;
    const dispatch: EventHandler = (type, detail) => {
        try {
            window.dispatchEvent(new CustomEvent(type, { detail }));
        } catch {
            // 
        }
    };

    let articles: Article[] = [];
    let filtered: Article[] = [];
    let loading = false;
    let error: string | null = null;

    // UI state
    let search = "";
    let sortKey: "price" | "stock" | null = null;
    let sortDir = 1; // 1 = asc, -1 = desc

    // Modal / form
    let showForm = false;
    let isEditing = false;
    let form: Partial<Article> = {
        name: "",
        description: "",
        price: 0,
        stock: 0,
    };

    // Confirmation
    let toDelete: Article | null = null;

    async function load() {
        loading = true;
        error = null;
        try {
            articles = await service.listArticles();
            applyFilters();
        } catch (e) {
            error = String(e);
        } finally {
            loading = false;
        }
    }

    function applyFilters() {
        const q = search.trim().toLowerCase();
        filtered = articles.filter(
            (a) =>
                !q ||
                a.name.toLowerCase().includes(q) ||
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
        form = { name: "", description: "", price: 0, stock: 0 };
        showForm = true;
    }

    function openEdit(a: Article) {
        isEditing = true;
        form = { ...a };
        showForm = true;
    }

    async function submit() {
        try {
            if (isEditing && form.id) {
                const updated = await service.updateArticle(
                    form.id as string,
                    form,
                );
                articles = articles.map((x) =>
                    x.id === updated.id ? updated : x,
                );
            } else {
                const created = await service.createArticle(form);
                articles = [created, ...articles];
            }
            showForm = false;
            applyFilters();
            dispatch("change");
        } catch (e) {
            alert(String(e));
        }
    }

    function confirmDelete(a: Article) {
        toDelete = a;
    }

    async function doDelete() {
        if (!toDelete) return;
        try {
            await service.deleteArticle(toDelete.id);
            articles = articles.filter((x) => x.id !== toDelete!.id);
            toDelete = null;
            applyFilters();
            dispatch("change");
        } catch (e) {
            alert(String(e));
        }
    }

    // reactive: run whenever dependencies used by applyFilters change
    $: { search; sortKey; sortDir; applyFilters(); }

    function formatPrice(n: number) {
        return n.toLocaleString('fr-SN', { style: 'currency', currency: 'XOF' });
    }

    onMount(load);
</script>

<div class="min-h-screen bg-base-200 p-4 md:p-8 w-full">
    
    <div class="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
             <p class="text-sm text-base-content/70">{filtered.length} article(s) affiché(s)</p>
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
                    on:click={() => { search = ""; }}
                    title="Effacer la recherche"
                >
                    <X class="w-5 h-5" />
                </button>
                {/if}
            </div>

            <button class="btn btn-primary shadow-sm gap-2" on:click={openCreate}>
                <Plus class="w-5 h-5" />
                <span class="hidden md:inline">Nouvel article</span>
            </button>
        </div>
    </div>

    <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0 overflow-hidden">
            {#if loading}
                <div class="flex justify-center items-center p-12">
                    <span class="loading loading-spinner loading-lg text-primary"></span>
                </div>
            {:else if error}
                <div class="alert alert-error m-4 rounded-lg">{error}</div>
            {:else}
                <div class="overflow-x-auto">
                    <table class="table table-zebra table-pin-rows w-full text-sm md:text-base">
                        <thead class="bg-base-200/50 text-base-content/80 uppercase text-xs font-semibold">
                            <tr>
                                <th class="py-2 md:py-4 pl-2 md:pl-6 text-left">Nom</th>

                                <th
                                    class="cursor-pointer hover:bg-base-200 hover:text-primary transition-colors text-right py-2 md:py-4 px-1 md:px-2"
                                    on:click={() => toggleSort("price")}
                                >
                                    <div class="flex items-center justify-end gap-0.5 md:gap-1">
                                        <span>Prix</span>
                                        {#if sortKey === "price"}
                                            {#if sortDir === 1}<ArrowUp class="w-4 h-4"/>{:else}<ArrowDown class="w-4 h-4"/>{/if}
                                        {:else}
                                            <ChevronsUpDown class="w-4 h-4 opacity-50"/>
                                        {/if}
                                    </div>
                                </th>

                                <th
                                    class="cursor-pointer hover:bg-base-200 hover:text-primary transition-colors text-center py-2 md:py-4 px-1 md:px-2"
                                    on:click={() => toggleSort("stock")}
                                >
                                     <div class="flex items-center justify-center gap-0.5 md:gap-1">
                                        <span>Stock</span>
                                         {#if sortKey === "stock"}
                                             {#if sortDir === 1}<ArrowUp class="w-4 h-4"/>{:else}<ArrowDown class="w-4 h-4"/>{/if}
                                         {:else}
                                             <ChevronsUpDown class="w-4 h-4 opacity-50"/>
                                         {/if}
                                     </div>
                                </th>
                                <th class="text-center py-2 md:py-4 pr-2 md:pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if filtered.length === 0}
                                <tr>
                                    <td colspan="4" class="text-center py-8 md:py-12 text-base-content/60 italic">
                                        Aucun article ne correspond à votre recherche.
                                    </td>
                                </tr>
                            {:else}
                                {#each filtered as a (a.id)}
                                    <tr class="hover:bg-base-200/30 transition-colors">
                                        <td class="pl-2 md:pl-6 py-2 md:py-3">
                                            <div class="font-bold text-base-content text-sm">{a.name}</div>
                                            {#if a.description}
                                                <div class="text-xs opacity-60 max-w-xs truncate hidden md:block" title={a.description}>
                                                    {a.description}
                                                </div>
                                            {/if}
                                        </td>
                                        
                                        <td class="text-right font-mono font-medium py-2 md:py-3 px-1 md:px-2 text- md:text-sm">
                                            {formatPrice(a.price)}
                                        </td>

                                        <td class="text-center font-semibold">
                                            {#if a.stock === 0}
                                                <div class="text-error badge-outline gap-1  text-sm">
                                                    <span class="hidden sm:inline">Épuisé</span>
                                                    <span class="sm:hidden">0</span>
                                                </div>
                                            {:else if a.stock < 10}
                                                <div class="text-warning badge-warning gap-1">
                                                    {a.stock}
                                                    <span class="hidden lg:inline ml-1 text-xs opacity-70">(Faible)</span>
                                                </div>
                                            {:else}
                                                <span class="text-success text-sm">
                                                    {a.stock}
                                                </span>
                                            {/if}
                                        </td>

                                        <td class="pr-3 md:pr-6 py-2 md:py-3">
                                            <div class="flex justify-center gap-0.75">
                                                <div class="md:hidden flex gap-1">
                                                    <div class="tooltip" data-tip="Modifier">
                                                        <button
                                                            class="btn btn-sm btn-square btn-ghost hover:bg-primary/10 hover:text-primary"
                                                            on:click={() => openEdit(a)}
                                                        >
                                                            <Pencil class="w-5 h-5" /> 
                                                        </button>
                                                    </div>
                                                    <div class="tooltip" data-tip="Supprimer">
                                                        <button
                                                            class="btn btn-sm btn-square btn-ghost text-error hover:bg-error/10"
                                                            on:click={() => confirmDelete(a)}
                                                        >
                                                            <Trash2 class="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="hidden md:flex gap-2">
                                                    <button
                                                        class="btn btn-sm btn-primary"
                                                        on:click={() => openEdit(a)}
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        class="btn btn-sm btn-error"
                                                        on:click={() => confirmDelete(a)}
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
            {#snippet children()}
                <div class="sm:max-w-lg w-full p-4">
                    <h3 class="font-bold text-xl mb-4 flex items-center gap-2">
                        {#if isEditing}<Pencil class="w-6 h-6 text-primary"/>{:else}<Plus class="w-6 h-6 text-primary"/>{/if}
                        {isEditing ? "Modifier l'article" : "Créer un nouvel article"}
                    </h3>
                    
                    <div class="flex flex-col gap-3">
                        <div class="form-control">
                            <label class="label" for="name"><span class="label-text font-medium">Nom du produit *</span></label>
                            <input id="name" class="input input-bordered focus:input-primary" placeholder="Ex: Laptop X1" bind:value={form.name} />
                        </div>
                        <div class="form-control">
                            <label class="label" for="description"><span class="label-text font-medium">Description</span></label>
                            <textarea id="description" class="textarea textarea-bordered h-24 focus:textarea-primary" placeholder="Courte description..." bind:value={form.description}></textarea>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div class="form-control">
                                <label class="label" for="price"><span class="label-text font-medium">Prix (F CFA) *</span></label>
                                <label class="input-group">
                                    <input id="price" type="number" class="input input-bordered w-full focus:input-primary" placeholder="0.00" bind:value={form.price} step="0.01" min="0"/>
                                </label>
                            </div>
                            <div class="form-control">
                                <label class="label" for="stock"><span class="label-text font-medium">Stock initial *</span></label>
                                <input id="stock" type="number" class="input input-bordered focus:input-primary" placeholder="0" bind:value={form.stock} min="0" />
                            </div>
                        </div>
                    </div>

                    <div class="modal-action mt-6">
                        <button class="btn btn-ghost" on:click={() => (showForm = false)}>Annuler</button>
                        <button class="btn btn-primary px-6" disabled={!form.name} on:click={submit}>
                            {isEditing ? "Enregistrer les modifications" : "Créer l'article"}
                        </button>
                    </div>
                </div>
            {/snippet}
        </ModalBox>
    {/if}

    {#if toDelete}
        <ModalBox onClose={() => (toDelete = null)}>
            {#snippet children()}
                <div class="w-full p-4">
                    <h3 class="font-bold text-lg text-error flex items-center gap-2">
                        <Trash2 class="w-6 h-6"/>
                        Confirmation de suppression
                    </h3>
                    <div class="py-4">
                        <p>Voulez-vous vraiment supprimer définitivement l'article :</p>
                        <p class="mt-2 p-3 bg-base-200 rounded-lg font-medium text-center">
                            {toDelete?.name}
                        </p>
                        <p class="text-sm text-base-content/70 mt-4">Cette action est irréversible.</p>
                    </div>
                    <div class="modal-action">
                        <button class="btn btn-ghost" on:click={() => (toDelete = null)}>Annuler</button>
                        <button class="btn btn-error px-6" on:click={doDelete}>Confirmer la suppression</button>
                    </div>
                </div>
            {/snippet}
        </ModalBox>
    {/if}
</div>