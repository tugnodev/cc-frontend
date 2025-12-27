<script>
    import { Pencil, AtSign, CardSim, User, Store } from "@lucide/svelte";
    import ModalBox from "./ModalBox.svelte";
    import UserModal from "./UserModal.svelte";

    let modal = $state(true);
</script>

<section class="flex flex-col items-center justify-center w-full gap-4">
    <div
        class="flex flex-col items-center gap-2 justify-center indicator w-40 rounded-full bg-white"
    >
        <img class="rounded-full" src="/profile.png" alt="" />
    </div>
    <div class="flex flex-col items-center gap-1">
        <div class="flex items-center">
            <h2 class="font-semibold text-xl">Racine DIOP</h2>
            <div class="badge badge-soft badge-success badge-sm">vendeur</div>
        </div>
        <h2 class="text-xs font-semibold flex items-center gap-1">
            <AtSign size={16} /> mailofracine1@gmail.com
        </h2>
        <h2 class="text-xs font-semibold flex items-center gap-1">
            <CardSim size={16} /> 78 475 45 28
        </h2>
    </div>
    <div class="flex w-full items-center justify-center gap-2">
        <button
            onclick={() => (modal = true)}
            class="btn btn-soft btn-sm btn-infos flex items-center gap-2"
            ><User /> Modifier le profile</button
        >
        <button class="btn btn-soft btn-sm btn-warning flex items-center gap-2"
            >Voire ma boutiques <Store /></button
        >
    </div>
</section>

{#if modal}
    <ModalBox onClose={() => (modal = false)}>
        <UserModal />
    </ModalBox>
{/if}
