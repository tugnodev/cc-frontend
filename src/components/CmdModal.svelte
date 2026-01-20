<script>
    import { Filter, CheckCircle, Clock, XCircle } from "@lucide/svelte";
    // @ts-nocheck

    const orders = [
        {
            id: 1,
            clientId: 1,
            clientName: "Moi",
            statut: "En attente",
            date: "2025-12-27",
            articles: ["Article A", "Article B"],
        },
        {
            id: 2,
            clientId: 2,
            clientName: "Alice",
            statut: "Validé",
            date: "2025-12-26",
            articles: ["Article C"],
        },
        {
            id: 3,
            clientId: 3,
            clientName: "Bob",
            statut: "Annulé",
            date: "2025-12-25",
            articles: ["Article D", "Article E"],
        },
        {
            id: 4,
            clientId: 4,
            clientName: "Devprocode",
            statut: "Annulé",
            date: "2026-01-02",
            articles: ["Article F", "Article G"],
        },
        {
            id: 5,
            clientId: 5,
            clientName: "Hackdev",
            statut: "En attente",
            date: "2026-01-03",
            articles: ["Article H", "Article I"],
        },
    ];

    // state
    let statusFilter = "Toutes"; // correspond aux boutons
    /**
     * @type {{ id: any; clientName: any; statut: any; date: any; articles: any; clientId?: number; } | null}
     */
    let selectedOrder = null;

    // filtered orders
    $: filteredOrders =
        statusFilter === "Toutes"
            ? orders
            : orders.filter((o) => o.statut === statusFilter);
</script>

<h2 class="text-xl font-bold mb-4">Commandes</h2>

<!-- BOUTONS DE FILTRE -->
<div class="flex flex-wrap gap-2 mb-6">
    <button
        class="btn btn-sm flex gap-1"
        class:btn-primary={statusFilter === "Toutes"}
        on:click={() => (statusFilter = "Toutes")}
    >
        <Filter class="w-4 h-4" /> Toutes
    </button>

    <button
        class="btn btn-sm flex gap-1"
        class:btn-success={statusFilter === "Validé"}
        on:click={() => (statusFilter = "Validé")}
    >
        <CheckCircle class="w-4 h-4" /> Validé
    </button>

    <button
        class="btn btn-sm flex gap-1"
        class:btn-warning={statusFilter === "En attente"}
        on:click={() => (statusFilter = "En attente")}
    >
        <Clock class="w-4 h-4" /> En attente
    </button>

    <button
        class="btn btn-sm flex gap-1"
        class:btn-error={statusFilter === "Annulé"}
        on:click={() => (statusFilter = "Annulé")}
    >
        <XCircle class="w-4 h-4" /> Annulé
    </button>
</div>

<!-- COMMANDES -->
{#if filteredOrders.length === 0}
    <p class="text-center text-gray-500">Aucune commande trouvée</p>
{:else}
    <div class="space-y-4">
        <!-- <-- interligne entre commandes -->
        {#each filteredOrders as order}
            <div class="collapse collapse-plus border rounded-box bg-base-200">
                <input type="checkbox" />
                <div
                    class="collapse-title font-bold flex justify-between items-center"
                >
                    <span>Commande #{order.id} — {order.clientName}</span>
                    <span class="badge">{order.statut}</span>
                </div>

                <div class="collapse-content">
                    <p><strong>Date :</strong> {order.date}</p>

                    <p class="mt-2 font-semibold">Articles :</p>
                    <ul class="list-disc ml-5">
                        {#each order.articles as article}
                            <li>{article}</li>
                        {/each}
                    </ul>

                    <button
                        class="btn btn-sm btn-primary mt-3"
                        on:click={() => (selectedOrder = order)}
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
            <p><strong>Client :</strong> {selectedOrder.clientName}</p>
            <p><strong>Statut :</strong> {selectedOrder.statut}</p>
            <p><strong>Date :</strong> {selectedOrder.date}</p>

            <div class="divider"></div>

            <ul class="list-disc list-inside">
                {#each selectedOrder.articles as a}
                    <li>{a}</li>
                {/each}
            </ul>

            <div class="modal-action">
                <button class="btn" on:click={() => (selectedOrder = null)}
                    >Fermer</button
                >
            </div>
        </div>
    </dialog>
{/if}
