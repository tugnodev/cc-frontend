<script lang="ts">
    import { onMount } from "svelte";
    import type { Article } from "../services/articleService";
    import * as service from "../services/articleService";

    // lightweight fallback dispatcher that avoids deprecated createEventDispatcher
    type EventHandler = (type: string, detail?: any) => void;
    const dispatch: EventHandler = (type, detail) => {
        try {
            // dispatch on window as a fallback; consumers can listen on window for these events
            window.dispatchEvent(new CustomEvent(type, { detail }));
        } catch {
            // no-op if dispatching fails
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
            // narrow sortKey and avoid using null as index type
            const key = sortKey as "price" | "stock";
            // use slice() to avoid mutating the original array with sort()
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
    $: applyFilters();

    function formatPrice(n: number) {
        return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    onMount(load);
</script>

<div class="p-4">
    <div class="flex justify-between items-center mb-4">
        <div class="flex gap-2 items-center w-full">
            <input
                type="text"
                placeholder="Recherche..."
                bind:value={search}
                class="input input-bordered"
            />
            <button
                class="btn btn-outline btn-sm"
                on:click={() => {
                    search = "";
                }}>Clear</button
            >
        </div>

        <div class="flex gap-2">
            <button class="btn btn-primary" on:click={openCreate}
                >Nouvel article</button
            >
        </div>
    </div>

    {#if loading}
        <div>Chargement...</div>
    {:else if error}
        <div class="alert alert-error">{error}</div>
    {:else}
        <div class="overflow-x-auto">
            <table class="table table-xs w-full">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <!-- <th>Description</th> -->
                        <th
                            class="cursor-pointer"
                            on:click={() => toggleSort("price")}
                            >Prix {sortKey === "price"
                                ? sortDir === 1
                                    ? "▲"
                                    : "▼"
                                : ""}</th
                        >
                        <th
                            class="cursor-pointer"
                            on:click={() => toggleSort("stock")}
                            >Stock {sortKey === "stock"
                                ? sortDir === 1
                                    ? "▲"
                                    : "▼"
                                : ""}</th
                        >
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filtered as a (a.id)}
                        <tr>
                            <td>{a.name}</td>
                            <!-- <td class="max-w-xs truncate" title={a.description}
                                >{a.description}</td
                            > -->
                            <td>{formatPrice(a.price)}</td>
                            <td>{a.stock}</td>
                            <td>
                                <div class="flex gap-2">
                                    <button
                                        class="btn btn-sm btn-ghost"
                                        on:click={() => openEdit(a)}
                                        >Modifier</button
                                    >
                                    <button
                                        class="btn btn-sm btn-error"
                                        on:click={() => confirmDelete(a)}
                                        >Supprimer</button
                                    >
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}

    <!-- Form modal -->
    {#if showForm}
        <div class="modal modal-open">
            <div class="modal-box">
                <h3 class="font-bold text-lg">
                    {isEditing ? "Modifier" : "Créer"} article
                </h3>
                <div class="form-control">
                    <label class="label" for="name">
                        <span class="label-text">Nom</span>
                    </label>
                    <input
                        class="input input-bordered"
                        bind:value={form.name}
                    />
                </div>
                <div class="form-control mt-2">
                    <label class="label" for="description">
                        <span class="label-text">Description</span>
                    </label>
                    <textarea
                        class="textarea textarea-bordered"
                        id="description"
                        bind:value={form.description}
                    ></textarea>
                </div>
                        <div class="flex gap-2 mt-2">
                    <div class="form-control w-1/2">
                        <label class="label" for="price">
                            <span class="label-text">Prix</span>
                        </label>
                        <input
                            type="number"
                            class="input input-bordered"
                            bind:value={form.price}
                            step="0.01"
                        />
                    </div>
                    <div class="form-control w-1/2">
                        <label class="label" for="stock">
                            <span class="label-text">Stock</span>
                        </label>
                        <input
                            type="number"
                            class="input input-bordered"
                            bind:value={form.stock}
                        />
                    </div>
                </div>

                <div class="modal-action">
                    <button class="btn" on:click={() => (showForm = false)}
                        >Annuler</button
                    >
                    <button class="btn btn-primary" on:click={submit}
                        >{isEditing ? "Enregistrer" : "Créer"}</button
                    >
                </div>
            </div>
        </div>
    {/if}

    <!-- Delete confirm modal -->
    {#if toDelete}
        <div class="modal modal-open">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Supprimer</h3>
                <p>
                    Voulez-vous vraiment supprimer <strong
                        >{toDelete.name}</strong
                    > ?
                </p>
                <div class="modal-action">
                    <button class="btn" on:click={() => (toDelete = null)}
                        >Annuler</button
                    >
                    <button class="btn btn-error" on:click={doDelete}
                        >Supprimer</button
                    >
                </div>
            </div>
        </div>
    {/if}
</div>
