<script lang="ts">
    import { Pencil, Trash2, Eye } from "@lucide/svelte";
    import type { articleDto } from "$lib/services/dtos/article";

    type Props = {
        article: articleDto;
        onEdit: (article: articleDto) => void;
        onDelete: (article: articleDto) => void;
        onViewImage?: (image: string) => void;
    };

    let { article, onEdit, onDelete, onViewImage }: Props = $props();

    function formatPrice(n: number) {
        return n.toLocaleString("fr-SN", {
            style: "currency",
            currency: "XOF",
        });
    }

    function formatDate(date: Date | string) {
        const d = typeof date === "string" ? new Date(date) : date;
        return d.toLocaleDateString("fr-FR");
    }
</script>

<tr class="hover">
    <!-- Image -->
    <td>
        {#if article.images && article.images.length > 0}
            <button
                type="button"
                class="avatar cursor-pointer hover:scale-105 transition-transform"
                onclick={() => onViewImage?.(article.images[0])}
            >
                <div class="mask mask-squircle w-12 h-12">
                    <img src={article.images[0]} alt={article.title} />
                </div>
            </button>
        {:else}
            <div class="avatar placeholder">
                <div class="bg-neutral-focus text-neutral-content mask mask-squircle w-12">
                    <span class="text-xl">?</span>
                </div>
            </div>
        {/if}
    </td>

    <!-- Title & Description -->
    <td>
        <div class="font-bold">{article.title}</div>
        {#if article.description}
            <div class="text-sm opacity-50 line-clamp-2">
                {article.description}
            </div>
        {/if}
    </td>

    <!-- Categories -->
    <td>
        {#if article.category && article.category.length > 0}
            <div class="flex flex-wrap gap-1">
                {#each article.category.slice(0, 2) as cat}
                    <span class="badge badge-sm badge-outline">{cat}</span>
                {/each}
                {#if article.category.length > 2}
                    <span class="badge badge-sm badge-ghost">+{article.category.length - 2}</span>
                {/if}
            </div>
        {:else}
            <span class="text-base-content/50 text-sm">Aucune</span>
        {/if}
    </td>

    <!-- Price -->
    <td>
        <div class="font-semibold text-primary">
            {formatPrice(article.price)}
        </div>
    </td>

    <!-- Stock -->
    <td>
        <div class="badge badge-lg" class:badge-success={article.stock > 10} class:badge-warning={article.stock > 0 && article.stock <= 10} class:badge-error={article.stock === 0}>
            {article.stock}
        </div>
    </td>

    <!-- Date -->
    <td class="text-sm text-base-content/70">
        {formatDate(article.updatedAt || article.createdAt)}
    </td>

    <!-- Actions -->
    <td>
        <div class="flex gap-2">
            <button
                type="button"
                class="btn btn-ghost btn-sm btn-circle tooltip"
                data-tip="Modifier"
                onclick={() => onEdit(article)}
            >
                <Pencil class="w-4 h-4" />
            </button>

            <button
                type="button"
                class="btn btn-ghost btn-sm btn-circle text-error tooltip"
                data-tip="Supprimer"
                onclick={() => onDelete(article)}
            >
                <Trash2 class="w-4 h-4" />
            </button>
        </div>
    </td>
</tr>
