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
    import PanierModal from "../../../components/PanierModal.svelte";
    import { blur, fade } from "svelte/transition";
    import ReviewsModal from "../../../components/ReviewsModal.svelte"
    let modal: boolean = $state(false);
    let activeRoute: any = $state(null);
    let orders = [];
    let statusFilter = "all";

    // @ts-ignore

    const routes = [
        { label: "Panier", icon: ShoppingCart },
        { label: "Chat", icon: MessageCircle },
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
                    onclick={() => {
                        activeRoute = route.label;
                        modal = true;
                    }}
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
    <!--Modale Panier -->
    {#if activeRoute == "Panier"}
        <ModalBox onClose={() => (modal = false)}>
            <PanierModal />
        </ModalBox>
    {/if}
    {#if activeRoute == "Chat"}
        <ModalBox onClose={() => (modal = false)}>
            <MsgModal />
        </ModalBox>
    {/if}

    {#if activeRoute == "Commandes"}
        <ModalBox onClose={() => (modal = false)}>
            <CmdModal {orders} />
        </ModalBox>
    {/if}

    {#if activeRoute == "Notes et avis"}
        <ModalBox onClose={() => (modal = false)}>
            <ReviewsModal />
        </ModalBox>
    {/if}
{/if}
