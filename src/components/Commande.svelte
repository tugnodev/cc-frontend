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

    let statutActif = "Toutes";

    onMount(() => {
        console.log("mounted");
    });

    async function changerStatut(id: string, nouveauStatut: string) {
        console.log("changerStatut", id, nouveauStatut);
    }

    function contacterClient(clientId: string) {
        window.location.href = `/discussion/${clientId}`;
    }

    // Filtrer selon le statut
    $: commandesFiltrees =
        statutActif === "Toutes"
            ? $orders
            : $orders.filter((c: orderDto) => c.order_status === statutActif);
</script>

<div
    class="w-full flex flex-col items-center justify-start mb-8 px-1 transition-all duration-300 ease-in-out"
>
    <!-- TITRE -->
    <div class="space-y-4 w-full p-4">
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
            class:btn-success={statutActif === "Validé"}
            onclick={() => (statutActif = "Validé")}
        >
            <CheckCircle class="w-4 h-4" /> Validé
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-warning={statutActif === "En attente"}
            onclick={() => (statutActif = "En attente")}
        >
            <Clock class="w-4 h-4" /> En attente
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-error={statutActif === "Annulé"}
            onclick={() => (statutActif = "Annulé")}
        >
            <XCircle class="w-4 h-4" /> Annulé
        </button>
    </div>

    <!-- COMMANDES -->
    {#if commandesFiltrees.length === 0}
        <p class="text-center text-gray-500 mt-10">Aucune commande trouvée</p>
    {:else}
        <div class="w-full max-w-3xl space-y-2 mt-6">
            {#each commandesFiltrees as commande}
                <div
                    class="collapse border-2 rounded-xl border-base-300 bg-base-100/60"
                >
                    <input type="checkbox" />

                    <div
                        class="collapse-title text-lg font-semibold flex justify-between items-center"
                    >
                        <span
                            >Commande #{commande.id} – {commande.buyer_id}</span
                        >
                        <div class="flex items-center gap-2">
                            <span class="badge">{commande.order_status}</span>
                            <ChevronDown class="w-5 h-5" />
                        </div>
                    </div>

                    <div class="collapse-content">
                        <p>
                            <strong>Date :</strong>
                            {new Date(commande.createdAt).toLocaleDateString()}
                        </p>

                        <p class="mt-2 font-semibold">Articles :</p>
                        <ul class="list-disc ml-5">
                            {#each commande.article_details as article}
                                <li>
                                    {article.quantity} – Qté: {article.quantity}
                                </li>
                            {/each}
                        </ul>

                        <div class="mt-4 flex gap-2 flex-wrap">
                            <button
                                class="btn btn-success btn-sm flex gap-1"
                                onclick={() =>
                                    changerStatut(commande.id, "Validé")}
                            >
                                <Check class="w-4 h-4" /> Valider
                            </button>

                            <button
                                class="btn btn-error btn-sm flex gap-1"
                                onclick={() =>
                                    changerStatut(commande.id, "Annulé")}
                            >
                                <X class="w-4 h-4" /> Annuler
                            </button>

                            <button
                                class="btn btn-outline btn-sm flex gap-1"
                                onclick={() =>
                                    contacterClient(commande.buyer_id)}
                            >
                                <MessageCircle class="w-4 h-4" /> Contacter
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
