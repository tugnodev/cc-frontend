<script lang="ts">
    import ProfileCard from "../../../components/ProfileCard.svelte";
    import {
        ShoppingCart,
        MessageCircle,
        PackageOpen,
        MessageSquareWarning,
    } from "@lucide/svelte";
    import { X } from "@lucide/svelte";
    import Main from "../../../components/Main.svelte";
    import ModalBox from "../../../components/ModalBox.svelte";
    import MsgModal from "../../../components/MsgModal.svelte";
    import CmdModal from "../../../components/CmdModal.svelte";

    let modal: boolean = false;
    let activeRoute: any = null;
    let window;
    let orders = [];
    let statusFilter = "all";

    // @ts-ignore

    const routes = [
        { label: "Panier", icon: ShoppingCart },
        { label: "Discussions", icon: MessageCircle },
        { label: "Commandes", icon: PackageOpen },
        { label: "Notes et avis", icon: MessageSquareWarning },
    ];
</script>

<Main>
    <div class="w-full h-auto p-2">
        <ProfileCard />
    </div>
    <div
        class="w-full max-w-xl flex flex-col items-center justify-center gap-4 p-2"
    >
        <div
            class="max-w-4xl w-full max-h-4xl h-full grid grid-cols-2 gap-x-2 gap-y-2"
        >
            {#each routes as route}
                <button
                    on:click={() => {
                        modal = true;
                        activeRoute = route.label;
                    }}
                    bind:this={window}
                    class="bg-base-100/50 border-2 rounded-xl gap-1 border-base-300 min-w-36 w-full min-h-36 h-full flex flex-col items-center justify-center"
                >
                    <span>
                        <route.icon class="min-w-10 h-auto" />
                    </span>
                    <span class="font-bold text-xl">{route.label}</span>
                </button>
            {/each}
        </div>
        <button class="w-full btn btn-error">Se deconnecter</button>
    </div>
</Main>

<!-- Modal -->
{#if modal}
    {#if activeRoute == "Panier"}
        <div
            class="absolute inset-0 p-2 bg-base-100/20 backdrop-blur z-50 flex items-center justify-center"
        >
            <ModalBox>
                <h1>Panier</h1>
            </ModalBox>
            <button
                on:click={() => (modal = false)}
                class="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost btn-error"
            >
                <X class="w-8 h-8" />
            </button>
        </div>
    {/if}

    {#if activeRoute == "Discutions"}
        <div
            class="absolute inset-0 p-2 bg-base-100/20 backdrop-blur z-50 flex items-center justify-center"
        >
            <ModalBox>
                <MsgModal onClose={() => (modal = false)} />
            </ModalBox>
        </div>
    {/if}

    {#if activeRoute == "Commandes"}
        <div
            class="absolute inset-0 p-2 bg-base-100/20 backdrop-blur z-50 flex items-center justify-center"
        >
            <ModalBox class="relative w-full max-w-3xl p-4">
                <button
                    on:click={() => (modal = false)}
                    class="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost btn-error"
                    aria-label="Fermer"
                >
                    <X class="w-6 h-6" />
                </button>

                <h1 class="text-xl font-bold mb-4">Commandes</h1>

                <select
                    bind:value={statusFilter}
                    class="select select-bordered mb-4 w-full"
                >
                    <option value="all">Toutes</option>
                    <option value="pending">En attente</option>
                    <option value="processing">En cours</option>
                    <option value="shipped">Expédiée</option>
                    <option value="delivered">Livrée</option>
                    <option value="canceled">Annulée</option>
                </select>

                <CmdModal {orders} {statusFilter} />
            </ModalBox>
        </div>
    {/if}

    {#if activeRoute == "Notes et avis"}
        <div
            class="absolute inset-0 p-2 bg-base-100/20 backdrop-blur z-50 flex items-center justify-center"
        >
            <ModalBox>
                <h1>Notes et avis</h1>
            </ModalBox>
            <button
                on:click={() => (modal = false)}
                class="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost btn-error"
            >
                <X class="w-8 h-8" />
            </button>
        </div>
    {/if}
{/if}
