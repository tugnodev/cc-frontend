<script lang="ts">
    import { onMount } from "svelte";
    import ModalBox from "./ModalBox.svelte";
    import ArticleList from "./ArticleList.svelte";
    import ArticleForm from "./ArticleForm.svelte";
    import ConfirmDialog from "./ConfirmDialog.svelte";
    import ImagePreview from "./ImagePreview.svelte";
    import { BackendFetch } from "$lib/backend";
    import { TokenManager } from "$lib/token";
    import type { articleDto } from "$lib/services/dtos/article";
    import { userArticles } from "$lib/store/articles";
    import { Plus } from "@lucide/svelte";
    import { user } from "$lib/store/users";
    import type { userDto } from "$lib/services/dtos/user";

    type EventHandler = (type: string, detail?: any) => void;
    const dispatch: EventHandler = (type, detail) => {
        try {
            window.dispatchEvent(new CustomEvent(type, { detail }));
        } catch {
            //
        }
    };

    // État réactif Svelte 5
    let articles = $state<articleDto[]>([]);
    let loading = $state(false);
    let error = $state<string | null>(null);
    let success = $state<string | null>(null);

    // Synchroniser le store vers l'état local
    $effect(() => {
        articles = $userArticles;
    });

    // Token manager and helpers
    const tokenManager = new TokenManager();

    async function getBackend(): Promise<BackendFetch> {
        const token = await tokenManager.loadToken();
        if (!token) {
            throw new Error("Utilisateur non authentifié");
        }
        return new BackendFetch(token);
    }

    function normalizeArticlesResponse(payload: unknown): articleDto[] {
        if (typeof payload === "string") {
            throw new Error(payload);
        }
        if (Array.isArray(payload)) return payload as articleDto[];
        if (payload && typeof payload === "object") {
            const maybeError = payload as { error?: unknown; message?: unknown; data?: unknown };
            if (typeof maybeError.error === "string") {
                throw new Error(maybeError.error);
            }
            if (typeof maybeError.message === "string") {
                throw new Error(maybeError.message);
            }
            const candidate = maybeError.data;
            if (Array.isArray(candidate)) return candidate as articleDto[];
        }
        throw new Error("Réponse inattendue du backend pour la liste des articles");
    }

    // Modal / form
    let showForm = $state(false);
    let editedArticle = $state<articleDto | null>(null);
    let imagePreviewModal = $state(false);
    let selectedImagePreview = $state<string | null>(null);

    // Confirmation
    let toDelete = $state<articleDto | null>(null);

    // Helpers to manipulate the articles store locally
    function addArticle(a: articleDto) {
        userArticles.update((arr) => [a, ...arr]);
    }

    function updateArticle(id: string, updated: articleDto) {
        userArticles.update((arr) =>
            arr.map((it) => (it.id === id ? { ...it, ...updated } : it)),
        );
    }

    function removeArticle(id: string) {
        userArticles.update((arr) => arr.filter((it) => it.id !== id));
    }

    async function getCurrentUser(): Promise<userDto | null> {
        const userStore = await user.get();
        return await new Promise((resolve) => {
            const unsubscribe = userStore.subscribe((usr) => {
                resolve(usr);
                unsubscribe();
            });
        });
    }

    async function load() {
        loading = true;
        error = null;
        try {
            const currentUser = await getCurrentUser();
            if (!currentUser?.id) {
                throw new Error("Utilisateur non authentifié");
            }

            const backend = await getBackend();
            const response = await backend.get<unknown>("/articles/all");
            const userArticlesData = normalizeArticlesResponse(response);
            const filteredByUser = userArticlesData.filter(
                (a) => a.userId === currentUser.id,
            );
            userArticles.set(filteredByUser);
        } catch (e) {
            error =
                e instanceof Error
                    ? e.message
                    : "Erreur lors du chargement des articles";
            console.error("Erreur load:", e);
        } finally {
            loading = false;
        }
    }

    function openCreate() {
        editedArticle = null;
        showForm = true;
    }

    function openEdit(a: articleDto) {
        editedArticle = a;
        showForm = true;
    }

    async function submit(formData: {
        title: string;
        description: string;
        price: number;
        stock: number;
        images: string[];
        category: string[];
    }) {
        error = null;
        success = null;

        try {
            const currentUser = await getCurrentUser();
            if (!currentUser?.id)
                throw new Error("Utilisateur non authentifié");

            const backend = await getBackend();

            if (editedArticle?.id) {
                const updated = await backend.patch<any>(`/articles/${editedArticle.id}`, {
                    id: editedArticle.id,
                    userId: currentUser.id,
                    title: formData.title,
                    description: formData.description,
                    price: formData.price,
                    stock: formData.stock,
                    images: formData.images,
                    category: formData.category,
                });
                updateArticle(editedArticle.id, updated);
                success = "Article mis à jour avec succès";
            } else {
                const newArticle = await backend.post<any>("/articles", {
                    userId: currentUser.id,
                    title: formData.title,
                    description: formData.description,
                    price: formData.price,
                    stock: formData.stock,
                    images: formData.images,
                    category: formData.category,
                });
                addArticle(newArticle);
                success = "Article créé avec succès";
            }

            showForm = false;
            editedArticle = null;
            setTimeout(() => {
                success = null;
            }, 3000);
            dispatch("change");
        } catch (e) {
            error =
                e instanceof Error ? e.message : "Erreur lors de la sauvegarde";
            console.error("Erreur submit:", e);
            throw e;
        }
    }

    function confirmDelete(a: articleDto) {
        toDelete = a;
    }

    async function doDelete() {
        if (!toDelete) return;
        try {
            const backend = await getBackend();
            await backend.delete(`/articles/${toDelete.id}`);
            removeArticle(toDelete.id);
            toDelete = null;
            success = "Article supprimé avec succès";
            setTimeout(() => {
                success = null;
            }, 3000);
            dispatch("change");
        } catch (e) {
            error =
                e instanceof Error
                    ? e.message
                    : "Erreur lors de la suppression";
            console.error("Erreur delete:", e);
        }
    }

    function openImagePreview(image: string) {
        selectedImagePreview = image;
        imagePreviewModal = true;
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

    <div class="mb-6 flex justify-end">
        <button
            class="btn btn-primary shadow-sm gap-2"
            onclick={openCreate}
        >
            <Plus class="w-5 h-5" />
            <span class="hidden md:inline">Nouvel article</span>
        </button>
    </div>

    <ArticleList
        {loading}
        {articles}
        onEdit={openEdit}
        onDelete={confirmDelete}
        onViewImage={openImagePreview}
    />

    {#if showForm}
        <ModalBox onClose={() => (showForm = false)}>
            <ArticleForm
                article={editedArticle}
                onSubmit={submit}
                onCancel={() => {
                    showForm = false;
                    editedArticle = null;
                }}
                {loading}
            />
        </ModalBox>
    {/if}

    {#if toDelete}
        <ModalBox onClose={() => (toDelete = null)}>
            <ConfirmDialog
                title="Confirmation de suppression"
                message={`Voulez-vous vraiment supprimer l'article \"${toDelete.title}\" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                onConfirm={doDelete}
                onCancel={() => (toDelete = null)}
                danger={true}
            />
        </ModalBox>
    {/if}

    {#if imagePreviewModal && selectedImagePreview}
        <ModalBox
            onClose={() => {
                imagePreviewModal = false;
                selectedImagePreview = null;
            }}
        >
            <ImagePreview
                image={selectedImagePreview}
                onClose={() => {
                    imagePreviewModal = false;
                    selectedImagePreview = null;
                }}
            />
        </ModalBox>
    {/if}
</div>
