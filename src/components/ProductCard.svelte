<script lang="ts">
    import ModalBox from "./ModalBox.svelte";
    import { type articleDto } from "$lib/services/dtos/article";
    import { type commentDto } from "$lib/services/dtos/comment";
    import { panier } from "$lib/store/articles";
    import { type item } from "$lib/services/dtos/cart";
    import { BackendFetch } from "$lib/backend";
    import { TokenManager } from "$lib/token";
    import { goto } from "$app/navigation";

    const { product }: { product: articleDto } = $props();
    let modal = $state(false);
    let commentModal = $state(false);

    async function getComments(productId: string) {
        const tm = new TokenManager();
        const token = await tm.loadToken().then((token) => {
            if (typeof token === "string") {
                return token;
            } else {
                return null;
            }
        });
        const fetch = new BackendFetch(token!);
        const response = await fetch.get(`/comments/${productId}`);
        const data = await response.json();
        comments = data;
    }

    const orderProcess = async (product: articleDto) => {
        goto(`/order/${product.id}`, { state: { product } });
    };

    const addToCart = async (product: articleDto) => {
        const item: item = {
            articleId: product.id,
            name: product.title,
            price: product.price,
            image: product.images[0],
        };
        panier.update((cart) => {
            for (let item of cart.cart) {
                if (item.articleId === product.id) {
                    return cart;
                }
            }
            cart.cart = [...cart.cart, item];
            return cart;
        });
        const tm = new TokenManager();
        const token = await tm.loadToken().then((token) => {
            if (typeof token === "string") {
                return token;
            } else {
                return null;
            }
        });
        const fetch = new BackendFetch(token!);
        console.log($panier.cart);
        const response = await fetch.patch("/cart", $panier);
        console.log(response);
    };

    const actions = [
        { label: "Commander", callback: orderProcess },
        { label: "Ajouter au panier", callback: addToCart },
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
                class="max-w-4xl flex h-56 overflow-x-auto snap-x snap-mandatory scroll-smooth gap-2 rounded"
            >
                {#each product.images as image}
                    <div class="h-full shrink-0 snap-center">
                        <img
                            src={image}
                            class="h-full aspect-square object-cover"
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
                        onclick={() => action.callback(product)}
                        class={`btn flex-1 btn-soft ${action.label === "Ajouter au panier" ? "btn-primary" : "btn-accent"}`}
                        >{action.label}</button
                    >
                {/each}
            </div>
        </div>
    </ModalBox>
{/if}
