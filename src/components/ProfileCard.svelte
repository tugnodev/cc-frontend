<script>
    import { AtSign, LocateIcon, User, Store } from "@lucide/svelte";
    import ModalBox from "./ModalBox.svelte";
    import UserModal from "./UserModal.svelte";
    import { user } from "$lib/store/users";
    import { goto } from "$app/navigation";

    let modal = $state(false);
</script>

<section class="w-full flex flex-col gap-2">
    <div class="flex items-start justify-start w-full gap-4 p-2">
        <div
            class="flex flex-col items-center gap-2 justify-center indicator w-24 rounded-full bg-white"
        >
            <img
                class="rounded-full object-cover w-full h-full"
                src={$user.image}
                alt=""
            />
        </div>
        <div class="flex flex-col items-start gap-1">
            <div class="flex items-center gap-1">
                <h2 class="font-bold flex items-center gap-1 text-xl">
                    <User />
                    {$user.name}
                </h2>
                {#if $user.vendeur}
                    <div class="badge badge-soft badge-success badge-sm">
                        vendeur
                    </div>
                {/if}
            </div>
            <h2 class="text-md font-semibold flex items-center gap-1">
                <AtSign size={16} />
                {$user.email}
            </h2>
            <h2 class="text-md font-semibold flex items-center gap-1">
                <LocateIcon size={16} />
                {$user.address}
            </h2>
        </div>
    </div>
    <div class="flex w-full items-center justify-center gap-2">
        <button
            onclick={() => (modal = true)}
            class="btn btn-soft flex-1 btn-sm btn-infos flex items-center gap-2"
            ><User /> Modifier le profile</button
        >
        <button
            class="btn btn-soft flex-1 btn-sm btn-warning flex items-center gap-2"
            onclick={() => goto("/shop")}
            >{$user.vendeur ? "Voir ma boutique" : "Créer ma boutique"}
            <Store /></button
        >
    </div>
</section>

{#if modal}
    <ModalBox onClose={() => (modal = false)}>
        <UserModal />
    </ModalBox>
{/if}
