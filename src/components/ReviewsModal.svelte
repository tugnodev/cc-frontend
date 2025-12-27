<script lang="ts">
    import { X, Star } from "@lucide/svelte";

    export let orders: any[] = [];

    let purchasedItems: Array<{
        id: string;
        name: string;
        price: number;
        qty: number;
        orderId: string;
        orderDate: string;
        rating?: number;
        comment?: string;
    }> = [];

    let editingReviews: Record<string, { rating: number; comment: string }> =
        {};

    function initializeItems() {
        const itemsMap = new Map<string, any>();

        orders.forEach((order) => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(
                    (item: {
                        id: any;
                        name: any;
                        price: any;
                        qty: any;
                        rating: any;
                        comment: any;
                    }) => {
                        const itemId = item.id ?? item.name;
                        if (!itemsMap.has(itemId)) {
                            itemsMap.set(itemId, {
                                id: itemId,
                                name: item.name,
                                price: item.price ?? 0,
                                qty: item.qty ?? 1,
                                orderId: order.id,
                                orderDate: order.date,
                                rating: item.rating ?? 0,
                                comment: item.comment ?? "",
                            });
                        }
                    },
                );
            }
        });

        purchasedItems = Array.from(itemsMap.values());

        purchasedItems.forEach((item) => {
            if (!editingReviews[item.id]) {
                editingReviews[item.id] = {
                    rating: item.rating ?? 0,
                    comment: item.comment ?? "",
                };
            }
        });

        // forcer réactivité
        editingReviews = { ...editingReviews };
    }

    function setRating(itemId: string, rating: number) {
        if (!editingReviews[itemId])
            editingReviews[itemId] = { rating: 0, comment: "" };
        editingReviews[itemId].rating = rating;
        editingReviews = { ...editingReviews };
    }

    function updateComment(itemId: string, comment: string) {
        if (!editingReviews[itemId])
            editingReviews[itemId] = { rating: 0, comment: "" };
        editingReviews[itemId].comment = comment;
        editingReviews = { ...editingReviews };
    }

    function saveReview(itemId: string) {
        const review = editingReviews[itemId];
        if (review && review.rating > 0) {
            const item = purchasedItems.find((i) => i.id === itemId);
            if (item) {
                item.rating = review.rating;
                item.comment = review.comment;
                console.log("Sauvegarde de l'avis:", { itemId, ...review });
            }
        }
    }

    // Articles de démonstration (utiles si `orders` est vide) pour l'aperçu UI : DEMO_ITEMS
    const DEMO_ITEMS = [
        {
            id: "demo-1",
            name: "Stylo Campus",
            price: 500,
            qty: 1,
            orderId: "demo-ord-1",
            orderDate: "2025-12-01",
            rating: 0,
            comment: "",
        },
        {
            id: "demo-2",
            name: "Cahier A4",
            price: 300,
            qty: 2,
            orderId: "demo-ord-2",
            orderDate: "2025-11-15",
            rating: 4,
            comment: "Bonne qualité pour les notes.",
        },
        {
            id: "demo-3",
            name: "Sac à dos",
            price: 7500,
            qty: 1,
            orderId: "demo-ord-3",
            orderDate: "2025-10-05",
            rating: 5,
            comment: "Solide et confortable.",
        },
        {
            id: "demo-4",
            name: "Clé USB 32GB",
            price: 2500,
            qty: 1,
            orderId: "demo-ord-4",
            orderDate: "2025-09-20",
            rating: 3,
            comment: "Fonctionne bien mais lente.",
        },
        {
            id: "demo-5",
            name: "Casquette campus",
            price: 1200,
            qty: 1,
            orderId: "demo-ord-5",
            orderDate: "2025-08-10",
            rating: 0,
            comment: "",
        },
    ];

    // Ici comme y'a aucune commande réelle, j'ai utilisé DEMO_ITEMS comme exemple d'illustration
    $: if ((!orders || orders.length === 0) && purchasedItems.length === 0) {
        purchasedItems = DEMO_ITEMS;
        purchasedItems.forEach((item) => {
            if (!editingReviews[item.id]) {
                editingReviews[item.id] = {
                    rating: item.rating ?? 0,
                    comment: item.comment ?? "",
                }; 
            }
        });
        editingReviews = { ...editingReviews };
    }

    // Si des commandes existent, initialiser à partir de celles-ci
    $: if (orders && orders.length > 0) {
        initializeItems();
    }
</script>

<div
    class="max-w-96 w-full bg-base-200/30 h-128 rounded-2xl border border-base-300 p-4 flex flex-col gap-4 relative"
>
    <!-- <button
        on:click={onClose}
        class="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost btn-error"
    >
        <X />
    </button> -->

    <div class="text-center">
        <h1 class="text-2xl font-bold">Notes et avis</h1>
    </div>

    <div class="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
        {#if purchasedItems.length === 0}
            <div class="text-center py-8">
                <p class="text-base-content/70">
                    Vous n'avez pas encore d'articles achetés à noter.
                </p>
            </div>
        {:else}
            <div class="space-y-6">
                {#each purchasedItems as item (item.id)}
                    <div
                        class="bg-base-100 rounded-xl p-3 border border-base-300"
                    >
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex-1">
                                <h3 class="text-lg font-semibold">
                                    {item.name}
                                </h3>
                                <p class="text-sm text-base-content/70">
                                    Commande #{item.orderId} - {item.orderDate}
                                </p>
                                <p class="text-sm text-base-content/70">
                                    Quantité: {item.qty} - Prix: {item.price} FCFA
                                </p>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label
                                class="block text-sm font-medium mb-2"
                                for="review-{item.id}"
                            >
                                Notez cet article :
                            </label>
                            <div class="flex gap-1 items-center">
                                {#each Array(5) as _, i}
                                    {@const starNumber = i + 1}
                                    {@const isFilled =
                                        (editingReviews[item.id]?.rating ??
                                            item.rating ??
                                            0) >= starNumber}
                                    <button
                                        type="button"
                                        on:click={() =>
                                            setRating(item.id, starNumber)}
                                        class="transition-colors duration-150"
                                        aria-label={"Noter " +
                                            starNumber +
                                            " étoile" +
                                            (starNumber > 1 ? "s" : "")}
                                    >
                                        <Star
                                            class={isFilled
                                                ? "w-6 h-6 fill-warning text-warning"
                                                : "w-6 h-6 text-base-content/30"}
                                        />
                                    </button>
                                {/each}
                                {#if editingReviews[item.id]?.rating || item.rating}
                                    <span class="ml-2 text-sm font-medium">
                                        ({editingReviews[item.id]?.rating ||
                                            item.rating}/5)
                                    </span>
                                {/if}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label
                                for={"comment-" + item.id}
                                class="block text-sm font-medium mb-2"
                            >
                                Votre avis :
                            </label>
                            <textarea
                                id={"comment-" + item.id}
                                class="textarea textarea-bordered w-full min-h-24"
                                placeholder="Partagez votre expérience avec cet article..."
                                value={editingReviews[item.id]?.comment ??
                                    item.comment ??
                                    ""}
                                on:input={(e: Event) =>
                                    updateComment(
                                        item.id,
                                        (e.currentTarget as HTMLTextAreaElement)
                                            .value,
                                    )}
                            ></textarea>
                        </div>

                        <div class="flex justify-end">
                            <button
                                class="btn btn-primary btn-sm"
                                disabled={!editingReviews[item.id]?.rating ||
                                    editingReviews[item.id]?.rating === 0}
                                on:click={() => saveReview(item.id)}
                            >
                                {item.rating
                                    ? "Mettre à jour l'avis"
                                    : "Publier l'avis"}
                            </button>
                        </div>

                        {#if item.rating && item.rating > 0 && item.comment}
                            <div class="mt-4 pt-4 border-t border-base-300">
                                <div class="flex items-center gap-2 mb-2">
                                    <div class="flex gap-1">
                                        {#each Array(5) as _, i}
                                            {@const starNumber = i + 1}
                                            <Star
                                                class={item.rating >= starNumber
                                                    ? "w-4 h-4 fill-warning text-warning"
                                                    : "w-4 h-4 text-base-content/30"}
                                            />
                                        {/each}
                                    </div>
                                    <span class="text-sm text-base-content/70">
                                        Votre avis publié
                                    </span>
                                </div>
                                <p class="text-sm text-base-content/80 italic">
                                    "{item.comment}"
                                </p>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>
