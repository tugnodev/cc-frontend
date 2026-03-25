<script lang="ts">
    import { RemoveFormattingIcon } from "@lucide/svelte";
    import { panier } from "$lib/store/articles";
    import type { cartDto } from "$lib/services/dtos/cart";
    import { onMount } from "svelte";
    import { TokenManager } from "$lib/token";
    import { BackendFetch } from "$lib/backend";
    import { user as usr } from "$lib/store/users";

    let cart = $state($panier);

    let totalPrice = cart.cart.reduce((acc, item) => acc + item.price, 0);

    function removeFromCart(id: string) {
        panier.update((crt: cartDto) => {
            const updatedCart = crt.cart.filter(
                (item) => item.articleId !== id,
            );
            return { ...crt, cart: updatedCart };
        });
    }
</script>

<div
    class="relative w-full h-full flex flex-col justify-center gap-4 max-w-lg p-2 bg-base-100 rounded-xl"
>
    <div class="w-full flex justify-between items-center">
        <h1 class="badge badge-warning badge-lg badge-soft font-bold">
            🛒 Mon panier
        </h1>
        <p class="badge badge-soft bottom-2 badge-error font-bold text-right">
            Total : {totalPrice || 0} FCFA
        </p>
    </div>
    <div class="flex flex-col gap-2">
        {#if !cart || cart.cart.length <= 0}
            <p class="text-center text-base-content">Votre panier est vide.</p>
        {:else}
            {#each cart.cart as item}
                <div
                    class="flex items-center gap-2 border border-base-300 p-2 rounded-xl"
                >
                    <img src={item.image} alt="" class="w-11 h-11 rounded-lg" />
                    <div class="flex-1 items-center">
                        <p class="font-semibold text-sm text-base-content">
                            {item.name}
                        </p>
                        <p class="badge badge-accent badge-soft">
                            {item.price} FCFA
                        </p>
                    </div>
                    <button
                        class="btn btn-error btn-soft btn-sm"
                        onclick={() => removeFromCart(item.articleId)}
                    >
                        <RemoveFormattingIcon />
                    </button>
                </div>
            {/each}
        {/if}
    </div>
</div>
