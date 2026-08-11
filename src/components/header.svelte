<script>
    import { ShoppingBag } from "@lucide/svelte";
    import ModalBox from "./ModalBox.svelte";
    import PanierModal from "../components/PanierModal.svelte";
    import { panier } from "$lib/store/articles";

    let modal = $state(false);
</script>

<header
    class="w-full h-16 bg-base-100/50 backdrop-blur-sm flex items-center justify-between p-2"
>
    <div>
        <span class="flex items-center justify-center w-20">
            <a href="/market">
                <img class="w-full h-full" src="/favicon.svg" alt="" />
            </a>
        </span>
    </div>
    <div>
        <span class="flex items-center">
            <button
                class="indicator btn btn-ghost"
                onclick={() => (modal = true)}
            >
                {#if $panier && $panier.items.length > 0}
                    <span
                        class="badge badge-error badge-soft badge-sm indicator-item mr-2"
                        >{$panier.items.length}</span
                    >
                {/if}
                <ShoppingBag size="32" />
            </button>
        </span>
    </div>
</header>

{#if modal}
    <ModalBox onClose={() => (modal = false)}>
        <PanierModal />
    </ModalBox>
{/if}
