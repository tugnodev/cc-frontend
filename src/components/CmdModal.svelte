<script lang="ts">
    import { Filter, CheckCircle, Clock, XCircle } from "@lucide/svelte";
    import { onMount } from "svelte";
    import { orders } from "$lib/store/order";
    import { OrderStatus, type orderDto } from "$lib/services/dtos/order";
    import { BackendFetch } from "$lib/backend";
    import { TokenManager } from "$lib/token";
    import { user } from "$lib/store/users";

    let statusFilter = $state("none");
    let selectedOrder = $derived(orders);

    onMount(async () => {
        let fetch: BackendFetch;
        {
            const tm = new TokenManager();
            const token = await tm.loadToken();
            fetch = new BackendFetch(token!);
        }
        const usr = await user.get();
        usr.subscribe(async (usr) => {
            console.log("subscribed");
            if (usr) {
                const res = await fetch.get(`/order/${usr.id}`);
                console.log(res);
                switch (typeof res) {
                    case "object":
                        orders.set(res);
                        break;
                    case "string":
                        orders.set([]);
                        break;
                }
            }
        });
    });

    async function cancelOrder(id: string) {
        let fetch: BackendFetch;
        {
            const tm = new TokenManager();
            const token = await tm.loadToken();
            fetch = new BackendFetch(token!);
        }

        const res = await fetch.patch(`/order`, {
            id: id,
            status: OrderStatus.ANNULEE,
        });

        switch (typeof res) {
            case "object":
                orders.update((orders) => {
                    return orders.map((order) => {
                        return order.id === id
                            ? { ...order, status: OrderStatus.ANNULEE }
                            : order;
                    });
                });
                break;
            case "string":
                //notification
                break;
        }
    }

    async function deleteOrder(id: string) {
        let fetch: BackendFetch;
        {
            const tm = new TokenManager();
            const token = await tm.loadToken();
            fetch = new BackendFetch(token!);
        }

        const res = await fetch.delete(`/order/${id}`);

        switch (typeof res) {
            case "object":
                orders.update((orders) => {
                    return orders.filter((order) => order.id !== id);
                });
                break;
            case "string":
                //notification
                break;
        }
    }
</script>

<div class="w-full h-full flex flex-col gap-4 items-center justify-center p-2">
    <h2 class="text-2xl font-bold p-2">Commandes</h2>

    <!-- BOUTONS DE FILTRE -->
    <div class="flex flex-wrap gap-2">
        <button
            class="btn btn-sm flex gap-1"
            class:btn-primary={statusFilter === "Toutes"}
            onclick={() => (statusFilter = "none")}
        >
            <Filter class="w-4 h-4" /> Toutes
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-success={statusFilter === OrderStatus.VALIDEE}
            onclick={() => (statusFilter = OrderStatus.VALIDEE)}
        >
            <CheckCircle class="w-4 h-4" /> Validé
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-warning={statusFilter === OrderStatus.ATTENTE}
            onclick={() => (statusFilter = OrderStatus.ATTENTE)}
        >
            <Clock class="w-4 h-4" /> En attente
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-error={statusFilter === OrderStatus.ANNULEE}
            onclick={() => (statusFilter = OrderStatus.ANNULEE)}
        >
            <XCircle class="w-4 h-4" /> Annulé
        </button>
    </div>

    {#each $selectedOrder as order}
        <details class="collapse bg-base-100 border rounded-md border-base-300">
            <summary class="p-2 flex gap-1 justify-between">
                <p>order-{order.id.slice(0, 20)}...</p>
                <p
                    class={`badge badge-${
                        order.status === OrderStatus.VALIDEE
                            ? "success"
                            : order.status === OrderStatus.ATTENTE
                              ? "warning"
                              : order.status === OrderStatus.ANNULEE
                                ? "error"
                                : "default"
                    }`}
                >
                    {order.status}
                </p>
            </summary>
            <div class="p-2 collapse-content flex flex-col gap-2">
                <span class="flex gap-2 items-start">
                    {#each order.items as item}
                        <img
                            class="h-20 aspect-square object-cover"
                            src={item.article.images[0]}
                            alt={`article image`}
                        />
                        <div class="flex flex-col gap-1">
                            <p>{item.article.title} - {item.quantity} x</p>
                            <p>{item.article.price * item.quantity} XOF</p>
                            <p>
                                {order.updatedAt}
                            </p>
                        </div>
                    {/each}
                </span>
                {#if order.status === OrderStatus.ATTENTE}
                    <button
                        onclick={() => cancelOrder(order.id)}
                        class="btn btn-error flex w-full">Annuler</button
                    >
                {:else if order.status === OrderStatus.ANNULEE}
                    <button
                        onclick={() => deleteOrder(order.id)}
                        class="btn btn-error flex w-full">Supprimer</button
                    >
                {/if}
            </div>
        </details>
    {/each}
</div>
