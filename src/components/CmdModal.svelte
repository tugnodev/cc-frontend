<script lang="ts">
    export let orders: any[] = [];
    export let statusFilter: string = "all";

    let selectedOrder: any = null;

    $: filteredOrders =
        statusFilter === "all"
            ? orders
            : orders.filter((o) => o.status === statusFilter);
</script>

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
                Commande {selectedOrder.id}
            </h3>

            <p>Status: {selectedOrder.status}</p>
            <p>Date: {selectedOrder.date}</p>

            <div class="divider"></div>

            {#each selectedOrder.items as i}
                <p>{i.name} — x{i.qty} — {i.price} FCFA</p>
            {/each}

            <div class="modal-action">
                <button class="btn" on:click={() => (selectedOrder = null)}>
                    Fermer
                </button>
            </div>
        </div>
    </dialog>
{/if}
