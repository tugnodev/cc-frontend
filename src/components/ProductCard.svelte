<script lang="ts">
    import ModalBox from "./ModalBox.svelte";
    import { type articleDto } from "$lib/services/dtos/article";
    import { type commentDto } from "$lib/services/dtos/comment";
    import { panier } from "$lib/store/articles";

    const { product }: { product: articleDto } = $props();
    let modal = $state(false);
    let commentModal = $state(false);

    const actions = [
        { label: "Commander", callback: () => "void" },
        { label: "Ajouter au panier", callback: () => "void" },
    ];

    let comments: commentDto[] = [];
</script>

<div
    role="button"
    tabindex="0"
    onclick={() => (modal = true)}
    onkeydown={(e) => {
        if (e.key === "Enter") {
            modal = true;
        }
    }}
    class=""
>
    <div class="w-full">
        <span class="w-full rounded">
            <img
                class="object-cover aspect-square w-full h-full"
                src={product.images[0]}
                alt="profile"
            />
        </span>
    </div>
    <div class="flex flex-col h-full w-full">
        <h3 class="text-nowrap overflow-hidden text-ellipsis">
            {product.title}
        </h3>
        <h3 class="font-semibold">{product.price} FCFA</h3>
    </div>
</div>

{#if modal}
    <ModalBox onClose={() => (modal = false)}>
        <div
            class="flex flex-col items-center justify-center gap-2 w-full p-2 overflow-scroll"
        >
            <div
                class="carousel carousel-center w-full max-w-md md:max-w-2xl h-[50vh] md:h-[80vh] max-h-48 md:max-h-72 space-x-2 rounded"
            >
                {#each product.images as image}
                    <div class="carousel-item h-full">
                        <img
                            src={image}
                            class="aspect-square object-cover"
                            alt=""
                        />
                    </div>
                {/each}
            </div>
            <div class="flex flex-col gap-2 p-2 w-full">
                <span class="flex items-center justify-between">
                    <h3 class="text-xl sm:text-2xl font-semibold">
                        {product.title}
                    </h3>
                    <span>{product.stock} 📦</span>
                </span>
                <span class="flex items-center justify-between">
                    <h3 class="font-semibold">{product.price} FCFA</h3>
                    <span>{Math.round(product.rates)} 🌟</span>
                </span>
                <div class="flex gap-2">
                    {#each product.category as tag}
                        <span class="badge badge-soft badge-warning text-sm"
                            >{tag}</span
                        >
                    {/each}
                </div>
                <h3>Description du produit</h3>
                <p class="text-sm text-gray-500">
                    {product.description}
                </p>
            </div>
            <div
                class="flex flex-col gap-2 p-2 max-h-[20vh] overflow-scroll no-scrollbar mb-12 w-full"
            >
                <button
                    onclick={() => (commentModal = true)}
                    class="btn btn-primary btn-soft btn-md w-full"
                    >Voir les commentaires</button
                >
            </div>
            <div
                class={`absolute flex gap-1 p-2 bg-base-200/10 backdrop-blur-2xl items-center bottom-0 z-20 w-full`}
            >
                {#each actions as action}
                    <button
                        onclick={() => action.callback()}
                        class={`btn flex-1 btn-soft ${action.label === "Ajouter au panier" ? "btn-primary" : "btn-accent"}`}
                        >{action.label}</button
                    >
                {/each}
            </div>
        </div>
    </ModalBox>
{/if}

{#if commentModal}
    <ModalBox onClose={() => (commentModal = false)}>
        <div
            class={`w-full p-2 flex flex-col gap-2 max-h-[80vh] overflow-scroll no-scrollbar`}
        >
            {#if comments.length > 0}
                {#each comments as comment}
                    <div
                        class="flex flex-col gap-2 border border-base-300 rounded-lg bg-base-200/10 backdrop-blur-2xl p-2 w-full"
                    >
                        <span class="flex items-center justify-between">
                            <span class="flex items-center gap-2">
                                <span>{comment.rates} ⭐</span>
                                <span class="text-xl font-semibold"
                                    >{comment.author}</span
                                >
                            </span>
                            <span class="text-base-content/60"
                                >{comment.createdAt}</span
                            >
                        </span>
                        <span>{comment.comment}</span>
                    </div>
                {/each}
            {:else}
                <div>
                    <span class="text-base-content/60">Aucun commentaire</span>
                </div>
            {/if}
            <div
                class="flex flex-col gap-2 border border-base-300 rounded-lg bg-base-200/10 backdrop-blur-2xl p-2 w-full"
            >
                <div class="flex items-center justify-between gap-2">
                    {#each [1, 2, 3, 4, 5] as rate}
                        <button
                            onclick={() => console.log(rate)}
                            class="badge badge-soft badge-base-300 text-base-content/60"
                            >{rate} ⭐</button
                        >
                    {/each}
                </div>
                <div class="flex items-center gap-2">
                    <input
                        class="input input-bordered w-full input-base-200 md:input-xl flex-4"
                        type="text"
                        placeholder="ecrire un commentaire"
                    />
                    <button
                        class="btn btn-base-300 btn-soft flex-1"
                        onclick={() => console.log("Comment envoyé")}
                        >Envoye</button
                    >
                </div>
            </div>
        </div>
    </ModalBox>
{/if}
