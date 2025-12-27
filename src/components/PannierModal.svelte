<script lang="ts">
    import { X } from "@lucide/svelte";

    export let cart = [];
    export let totalPrice = 0;
    export let onClose: () => void;

    function removeFromCart(id: number) {
        cart = cart.filter(item => item.id !== id);
    }
</script>

<div class="absolute inset-0 bg-base-100/20 backdrop-blur z-50 flex items-center justify-center">
    <div class="relative w-full max-w-lg p-4 bg-base-100 rounded-xl">
        <button
            on:click={onClose}
            class="absolute top-2 right-2 btn btn-sm btn-circle btn-error btn-ghost"
        >
            <X class="w-6 h-6" />
        </button>

        <h1 class="text-xl font-bold mb-4">🛒 Mon panier</h1>

        {#each cart as item}
            <div class="flex gap-3 border p-3 rounded-xl mb-2">
                <img src={item.image} class="w-16 h-16 rounded-lg" />
                <div class="flex-1">
                    <p class="font-semibold">{item.name}</p>
                    <p class="text-green-600 font-bold">{item.price} FCFA</p>
                </div>
            </div>
        {/each}

        <div class="divider"></div>
        <p class="text-lg font-bold text-right">
            Total : {totalPrice} FCFA
        </p>
    </div>
</div>
