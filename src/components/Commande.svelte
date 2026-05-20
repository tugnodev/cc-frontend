<script lang="ts">
    import {
        Check,
        X,
        MessageCircle,
        ChevronDown,
        ShoppingCart,
        Filter,
        CheckCircle,
        Clock,
        XCircle,
    } from "@lucide/svelte";

    import { onMount } from "svelte";
    import { orders } from "$lib/store/order";
    import type { orderDto } from "$lib/services/dtos/order";
    import { OrderStatus } from "$lib/services/dtos/order";
    import { BackendFetch } from "$lib/backend";
    import { TokenManager } from "$lib/token";
    import { user } from "$lib/store/users";
    import Spinner from "./Spinner.svelte";

    let statutActif = $state("Toutes");
    let loading = $state(true);
    let fetching = $state(false);

    onMount(async () => {
        let fetch: BackendFetch;
        {
            const tm = new TokenManager();
            const token = await tm.loadToken();
            fetch = new BackendFetch(token!);
        }
        const usr = await user.get();
        usr.subscribe(async (user) => {
            const res = (await fetch.get(`/order/${user!.id}`)) as orderDto[];
            if (typeof res === "string") return [];
            if (!res) return [];
            orders.set(res);
            loading = false;
        });
    });

    async function changerStatut(id: string, statut: string) {
        let fetch: BackendFetch;
        {
            const tm = new TokenManager();
            const token = await tm.loadToken();
            fetching = true;
            fetch = new BackendFetch(token!);
        }
        const usr = await user.get();
        usr.subscribe(async (user) => {
            const res = await fetch.patch(`/order`, {
                id: id,
                status: statut,
            });
            if (typeof res === "string") {
                alert(res);
                return 0;
            }
            orders.update((orders) => {
                return orders.map((order) => {
                    if (order.id === id) {
                        return { ...order, status: statut };
                    }
                    fetching = false;
                    return order;
                });
            });
            loading = false;
        });
    }

    function contacterClient(clientId: string) {
        window.location.href = `/discussion/${clientId}`;
    }

    // Filtrer selon le statut
    let commandesFiltrees = $derived(
        statutActif === "Toutes"
            ? $orders
            : $orders.filter((c: orderDto) => c.status === statutActif),
    );
</script>

<div
    class="w-full flex flex-col gap-4 items-center justify-start px-1 transition-all duration-300 ease-in-out"
>
    <!-- TITRE -->
    <div class="space-y-4 w-full px-2">
        <h1 class="text-3xl font-bold flex items-center gap-2">
            <ShoppingCart class="w-6 h-6" />
            Commandes
        </h1>
    </div>

    <!-- FILTRE -->
    <div class="flex flex-wrap gap-2">
        <button
            class="btn btn-sm flex gap-1"
            class:btn-primary={statutActif === "Toutes"}
            onclick={() => (statutActif = "Toutes")}
        >
            <Filter class="w-4 h-4" /> Toutes
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-success={statutActif === OrderStatus.VALIDEE}
            onclick={() => (statutActif = OrderStatus.VALIDEE)}
        >
            <CheckCircle class="w-4 h-4" /> Validé
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-warning={statutActif === OrderStatus.ATTENTE}
            onclick={() => (statutActif = OrderStatus.ATTENTE)}
        >
            <Clock class="w-4 h-4" /> En attente
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-error={statutActif === OrderStatus.ANNULEE}
            onclick={() => (statutActif = OrderStatus.ANNULEE)}
        >
            <XCircle class="w-4 h-4" /> Annulé
        </button>
    </div>
</div>
<!-- COMMANDES -->
{#if loading}
    <Spinner />
{:else if $orders.length === 0}
    <p class="text-center text-gray-500 mt-10">Aucune commande trouvée</p>
{:else if commandesFiltrees.length === 0}
    <p class="text-center text-gray-500 mt-10">Aucune commande trouvée</p>
{:else}
    <div class="w-full max-w-3xl space-y-2">
        {#each commandesFiltrees as commande}
            <div
                class="collapse border-2 rounded-xl border-base-300 bg-base-100/60"
            >
                <input type="checkbox" />

                <div
                    class="collapse-title text-lg font-semibold flex justify-between items-center"
                >
                    <span>Commande #{commande.id.slice(-8)}...</span>
                    <div class="flex items-center gap-2">
                        <span
                            class={`badge ${commande.status === OrderStatus.ATTENTE ? "badge-warning" : commande.status === OrderStatus.VALIDEE ? "badge-success" : "badge-error"}`}
                            >{commande.status}</span
                        >
                    </div>
                </div>

                <div class="collapse-content">
                    <p>
                        <strong>Date :</strong>
                        {new Date(commande.createdAt).toLocaleDateString()}
                    </p>

                    <ul class="list-disc ml-5">
                        {#each commande.items as article}
                            <li class="flex items-center gap-2">
                                <img
                                    class={`w-10 h-10 object-cover rounded-sm`}
                                    src={article.article.images[0]}
                                    alt={article.article.title}
                                />
                                <div class="flex flex-col">
                                    <span class="ml-2"
                                        >{article.article.title} - Qnté : {article.quantity}</span
                                    >
                                    <span class="ml-2"
                                        >{article.article.price *
                                            article.quantity} Fcfa</span
                                    >
                                </div>
                            </li>
                        {/each}
                    </ul>

                    <div class="mt-4 flex gap-2 flex-wrap">
                        <button
                            disabled={commande.status === OrderStatus.VALIDEE ||
                                commande.status === OrderStatus.ANNULEE ||
                                fetching}
                            class="btn btn-success btn-sm flex gap-1"
                            onclick={() =>
                                changerStatut(commande.id, OrderStatus.VALIDEE)}
                        >
                            <Check class="w-4 h-4" /> Valider
                        </button>

                        <button
                            disabled={commande.status === OrderStatus.ANNULEE ||
                                fetching}
                            class="btn btn-error btn-sm flex gap-1"
                            onclick={() =>
                                changerStatut(commande.id, OrderStatus.ANNULEE)}
                        >
                            <X class="w-4 h-4" /> Annuler
                        </button>

                        <button
                            class="btn btn-outline btn-sm flex gap-1"
                            onclick={() => contacterClient(commande.buyerId)}
                        >
                            <MessageCircle class="w-4 h-4" /> Contacter
                        </button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/if}
