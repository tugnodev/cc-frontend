<script lang="ts">
    import { Filter, CheckCircle, Clock, XCircle } from "@lucide/svelte";
    import { onMount } from "svelte";
    import { orders } from "$lib/store/order";
    import type { orderDto } from "$lib/services/dtos/order";

    let statusFilter = "Toutes";
    let selectedOrder: orderDto | null = null;

    onMount(() => {
        orders.loadAll();
    });

    $: filteredOrders =
        statusFilter === "Toutes"
            ? $orders
            : $orders.filter((o) => o.order_status === statusFilter);
</script>

<div class="w-full h-full flex flex-col gap-4 items-center justify-center p-2">
    <h2 class="text-2xl font-bold p-2">Commandes</h2>

    <!-- BOUTONS DE FILTRE -->
    <div class="flex flex-wrap gap-2">
        <button
            class="btn btn-sm flex gap-1"
            class:btn-primary={statusFilter === "Toutes"}
            onclick={() => (statusFilter = "Toutes")}
        >
            <Filter class="w-4 h-4" /> Toutes
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-success={statusFilter === "Validé"}
            onclick={() => (statusFilter = "Validé")}
        >
            <CheckCircle class="w-4 h-4" /> Validé
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-warning={statusFilter === "En attente"}
            onclick={() => (statusFilter = "En attente")}
        >
            <Clock class="w-4 h-4" /> En attente
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-error={statusFilter === "Annulé"}
            onclick={() => (statusFilter = "Annulé")}
        >
            <XCircle class="w-4 h-4" /> Annulé
        </button>
    </div>

    <!-- COMMANDES -->
    {#if filteredOrders.length === 0}
        <p class="text-center text-gray-500">Aucune commande trouvée</p>
    {:else}
        <div class="space-y-4">
            {#each filteredOrders as order}
                <div
                    class="collapse collapse-plus border rounded-box bg-base-200"
                >
                    <input type="checkbox" />
                    <div
                        class="collapse-title font-bold flex justify-between items-center"
                    >
                        <span>Commande #{order.id} — {order.buyer_id}</span>
                        <span class="badge">{order.order_status}</span>
                    </div>

                    <div class="collapse-content">
                        <p>
                            <strong>Date :</strong>
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>

                        <p class="mt-2 font-semibold">Articles :</p>
                        <ul class="list-disc ml-5">
                            {#each order.article_details as article}
                                <li>
                                    {article.articleId} – Qté: {article.quantity}
                                </li>
                            {/each}
                        </ul>

                        <button
                            class="btn btn-sm btn-primary mt-3"
                            onclick={() => (selectedOrder = order)}
                        >
                            Voir plus
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    <!-- MODAL DETAILS -->
    {#if selectedOrder}
        <dialog class="modal modal-open">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Commande #{selectedOrder.id}</h3>
                <p><strong>Client :</strong> {selectedOrder.buyer_id}</p>
                <p><strong>Statut :</strong> {selectedOrder.order_status}</p>
                <p>
                    <strong>Date :</strong>
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>

                <div class="divider"></div>

                <ul class="list-disc list-inside">
                    {#each selectedOrder.article_details as a}
                        <li>{a.articleId} – Qté: {a.quantity}</li>
                    {/each}
                </ul>

                <div class="modal-action">
                    <button class="btn" onclick={() => (selectedOrder = null)}
                        >Fermer</button
                    >
                </div>
            </div>
        </dialog>
    {/if}
</div>
