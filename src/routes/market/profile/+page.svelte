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

    let modal : boolean = false;
    let activeRoute : any = null;
    let window;

    // @ts-ignore

    const routes = [
        { label: "Panier", icon: ShoppingCart },
        { label: "Discutions", icon: MessageCircle },
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
{#each routes as route}
    {#if modal}
        {#if activeRoute == "Panier"}
            <div
                class="absolute inset-0 p-2 bg-base-100/70 backdrop-blur z-50 flex items-center justify-center"
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
                class="absolute inset-0 p-2 bg-base-100/70 backdrop-blur z-50 flex items-center justify-center"
            >
                <MsgModal onClose={() => (modal = false)} />
            </div>
        {/if}
        {#if activeRoute == "Commandes"}
            <div
                class="absolute inset-0 p-2 bg-base-100/70 backdrop-blur z-50 flex items-center justify-center"
            >
                <ModalBox>
                    <h1>Commandes</h1>
                </ModalBox>
                <button
                    on:click={() => (modal = false)}
                    class="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost btn-error"
                >
                    <X class="w-8 h-8" />
                </button>
            </div>
        {/if}
        {#if activeRoute == "Notes et avis"}
            <div
                class="absolute inset-0 p-2 bg-base-100/70 backdrop-blur z-50 flex items-center justify-center"
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
{/each}
