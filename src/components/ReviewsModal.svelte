<script lang="ts">
    import { Star, PackageOpen } from "@lucide/svelte";
    import { onMount } from "svelte";
    import { OrderStatus, type Order, type orderDto } from "$lib/services/dtos/order";
    import { type createCommentDto } from "$lib/services/dtos/comment";
    import { type createNotesDto } from "$lib/services/dtos/notes";
    import { BackendFetch } from "$lib/backend";
    import { TokenManager } from "$lib/token";
    import { user } from "$lib/store/users";
    import Spinner from "./Spinner.svelte";

    let loading = $state(true);
    let orders = $state<Order[]>([]);

    // Etat local du formulaire, par commande
    let ratingByOrder = $state<Record<string, number>>({});
    let commentByOrder = $state<Record<string, string>>({});
    let submittingByOrder = $state<Record<string, boolean>>({});
    let submittedOrderIds = $state<Set<string>>(new Set());
    let errorByOrder = $state<Record<string, string>>({});

    async function getFetch() {
        const tm = new TokenManager();
        const token = await tm.loadToken();
        return new BackendFetch(token!);
    }

    onMount(async () => {
        const fetch = await getFetch();
        const usr = await user.get();
        usr.subscribe(async (usr) => {
            if (!usr) {
                loading = false;
                return;
            }

            const res = (await fetch.get(`/order/${usr.id}`)) as orderDto[] | string;

            if (typeof res === "string") {
                orders = [];
                loading = false;
                return;
            }

            const data: Order[] = [];
            for (const order of res) {
                // Seules les commandes validées peuvent être notées / commentées
                if (order.status !== OrderStatus.VALIDEE) continue;

                const article = await fetch.get(`/articles/${order.items[0].articleId}`);
                if (typeof article === "string") continue;

                data.push({
                    ...order,
                    items: [
                        {
                            quantity: order.items[0].quantity,
                            article: article!,
                        },
                    ],
                });
            }
            orders = data;
            loading = false;
        });
    });

    function setRating(orderId: string, value: number) {
        ratingByOrder = { ...ratingByOrder, [orderId]: value };
    }

    async function submitReview(order: Order) {
        const usr = await user.get();
        let currentUser: { id: string } | null = null;
        usr.subscribe((u) => (currentUser = u))();
        if (!currentUser) return;

        const rating = ratingByOrder[order.id] ?? 0;
        const comment = (commentByOrder[order.id] ?? "").trim();

        if (rating < 1) {
            errorByOrder = { ...errorByOrder, [order.id]: "Choisis une note avant d'envoyer." };
            return;
        }
        if (comment.length === 0) {
            errorByOrder = { ...errorByOrder, [order.id]: "Ecris un petit avis avant d'envoyer." };
            return;
        }

        errorByOrder = { ...errorByOrder, [order.id]: "" };
        submittingByOrder = { ...submittingByOrder, [order.id]: true };

        const fetch = await getFetch();
        const userId = (currentUser as { id: string }).id;
        const articleId = order.items[0].article.id;

        // La note (étoiles) et l'avis (texte) sont deux ressources distinctes côté backend
        const notePayload: createNotesDto = { number: rating, userId, articleId };
        const commentPayload: createCommentDto = { articleId, userId, comment };

        const [noteRes, commentRes] = await Promise.all([
            fetch.post("/notes", notePayload),
            fetch.post("/comments", commentPayload),
        ]);

        submittingByOrder = { ...submittingByOrder, [order.id]: false };

        // /notes renvoie une chaîne brute en cas d'erreur ("Note already exists" n'est pas bloquant)
        const noteError =
            typeof noteRes === "string" && noteRes !== "Note already exists"
                ? noteRes
                : null;

        // /comments enveloppe ses erreurs dans { message }
        const commentError =
            commentRes && typeof commentRes === "object" && "message" in commentRes
                ? (commentRes as { message: string }).message
                : null;

        if (noteError || commentError) {
            errorByOrder = {
                ...errorByOrder,
                [order.id]: noteError ?? commentError ?? "Une erreur est survenue.",
            };
            return;
        }

        submittedOrderIds = new Set(submittedOrderIds).add(order.id);
    }
</script>

<div class="w-full h-full flex flex-col gap-4 items-center justify-start p-2">
    <h2 class="text-2xl font-bold p-2">Notes et avis</h2>

    {#if loading}
        <Spinner />
    {:else if orders.length === 0}
        <div class="flex flex-col items-center gap-2 text-gray-500 p-6">
            <PackageOpen class="w-10 h-10" />
            <p class="text-center">
                Aucune commande validée à noter pour le moment.
            </p>
        </div>
    {:else}
        <div class="w-full flex flex-col gap-3">
            {#each orders as order (order.id)}
                {@const item = order.items[0]}
                {@const alreadySubmitted = submittedOrderIds.has(order.id)}
                <div class="w-full bg-base-100 border border-base-300 rounded-xl p-3 flex flex-col gap-2">
                    <div class="flex gap-2 items-center">
                        <img
                            class="w-14 h-14 object-cover rounded-md"
                            src={item.article.images[0]}
                            alt={item.article.title}
                        />
                        <div class="flex flex-col">
                            <p class="font-semibold">{item.article.title}</p>
                            <p class="text-sm text-gray-500">
                                Commande #{order.id.slice(-8)}
                            </p>
                        </div>
                    </div>

                    {#if alreadySubmitted}
                        <p class="text-success text-sm font-medium">
                            Merci, ton avis a bien été envoyé !
                        </p>
                    {:else}
                        <!-- Sélecteur d'étoiles -->
                        <div class="flex gap-1">
                            {#each [1, 2, 3, 4, 5] as star}
                                <button
                                    type="button"
                                    aria-label={`Noter ${star} étoile${star > 1 ? "s" : ""}`}
                                    onclick={() => setRating(order.id, star)}
                                    class="btn btn-ghost btn-xs p-0 min-h-0 h-auto"
                                >
                                    <Star
                                        class={`w-6 h-6 ${
                                            (ratingByOrder[order.id] ?? 0) >= star
                                                ? "fill-warning text-warning"
                                                : "text-base-300"
                                        }`}
                                    />
                                </button>
                            {/each}
                        </div>

                        <textarea
                            class="textarea textarea-bordered w-full"
                            placeholder="Ton avis sur ce produit..."
                            bind:value={commentByOrder[order.id]}
                            rows="2"
                        ></textarea>

                        {#if errorByOrder[order.id]}
                            <p class="text-error text-sm">{errorByOrder[order.id]}</p>
                        {/if}

                        <button
                            class="btn btn-primary btn-sm w-full"
                            disabled={submittingByOrder[order.id]}
                            onclick={() => submitReview(order)}
                        >
                            {submittingByOrder[order.id] ? "Envoi..." : "Envoyer l'avis"}
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>