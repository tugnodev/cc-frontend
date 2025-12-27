<script>
    const { orders = [] } = $props();

    // state
    let statusFilter = $state("all");
    let selectedOrder = $state(null);

    // derived value
    const filteredOrders = $derived(() =>
        statusFilter === "all"
            ? orders
            : orders.filter((o) => o.status === statusFilter),
    );
</script>

<h2 class="text-xl font-bold mb-4">Commandes</h2>

<select bind:value={statusFilter} class="select select-bordered mb-4 w-full">
    <option value="all">Toutes</option>
    <option value="pending">En attente</option>
    <option value="processing">En cours</option>
    <option value="shipped">Expédiée</option>
    <option value="delivered">Livrée</option>
    <option value="canceled">Annulée</option>
</select>

{#if filteredOrders.length === 0}
    <p class="text-center">Aucune commande trouvée</p>
{:else}
    {#each filteredOrders as order}
        <div class="collapse collapse-plus bg-base-200 my-2">
            <input type="checkbox" />

            <div class="collapse-title font-bold">
                {order.id} — {order.status} — {order.date}
            </div>

            <div class="collapse-content">
                <p>Total: {order.total} FCFA</p>

                <ul class="mt-2">
                    {#each order.items as item}
                        <li>{item.name} — x{item.qty} — {item.price} FCFA</li>
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
{/if}

{#if selectedOrder}
    <dialog class="modal modal-open">
        <div class="modal-box">
            <h3 class="font-bold text-lg">
                Commande {selectedOrder.id}
            </h3>

            <p>Status: {selectedOrder.status}</p>
            <p>Date: {selectedOrder.date}</p>

            <div class="divider"></div>

            {#each selectedOrder.items as i}
                <p>{i.name} — x{i.qty} — {i.price} FCFA</p>
            {/each}

            <div class="modal-action">
                <button class="btn" onclick={() => (selectedOrder = null)}>
                    Fermer
                </button>
            </div>
        </div>
    </dialog>
{/if}
