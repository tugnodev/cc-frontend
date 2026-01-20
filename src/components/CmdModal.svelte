<script>
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
    let statusFilter = "all";
    let selectedOrder = null;

    // derived
    $: filteredOrders =
        statusFilter === "all"
            ? orders
            : orders.filter((o) => o.statut === statusFilter);
</script>

<h2 class="text-xl font-bold mb-4">Commandes</h2>

<select bind:value={statusFilter} class="select select-bordered mb-4 w-full">
    <option value="all">Toutes</option>
    <option value="En attente">En attente</option>
    <option value="Validé">Validé</option>
    <option value="Annulé">Annulée</option>
</select>

{#if filteredOrders.length === 0}
    <p class="text-center">Aucune commande trouvée</p>
{:else}
    {#each filteredOrders as order}
        <div class="collapse collapse-plus bg-base-200 my-2">
            <input type="checkbox" />

            <div class="collapse-title font-bold">
                #{order.id} — {order.clientName} — {order.statut}
            </div>

            <div class="collapse-content">
                <p><strong>Date :</strong> {order.date}</p>

                <ul class="mt-2 list-disc list-inside">
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
{/if}

{#if selectedOrder}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg">
                Commande #{selectedOrder.id}
            </h3>

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
                <button class="btn" on:click={() => (selectedOrder = null)}>
                    Fermer
                </button>
            </div>
        </div>
    </dialog>
{/if}
