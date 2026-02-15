<script>
    import { user as User } from "$lib/store/users";

    const usr = User.get();
    const user = $usr;
</script>

<form
    class="flex flex-col w-full h-full items-center justify-center gap-4 p-2"
    action=""
>
    <h1 class="text-xl font-semibold">
        {`Modifier le profile`.toUpperCase()}
    </h1>

    <button class="w-28 h-28">
        <img class="rounded-full" src="/profile.png" alt="" />
    </button>

    <div class="w-full flex flex-col item-center gap-2 justify-center">
        <input
            value={user.name}
            class="input input-sm input-border bg-transparent w-full"
            type="text"
            placeholder="Nom Complet"
        />
        <input
            value={user.email}
            class="input input-sm input-border bg-transparent w-full"
            type="email"
            placeholder="Email"
        />
        <input
            value={user.address}
            class="w-full input input-sm input-border bg-transparent"
            type="text"
            placeholder="Nom d'utilisateur"
        />
    </div>
    <div class="divider my-0 py-0"></div>
    <div class="flex flex-col item-center gap-2 justify-center w-full">
        <input
            type="password"
            class="w-full input input-sm input-border bg-transparent"
            placeholder="Ancien Mot de passe"
        />
        <input
            type="password"
            class="w-full input input-sm input-border bg-transparent"
            placeholder="Nouveau Mot de passe"
        />
        <input
            type="password"
            class="w-full input input-sm input-border bg-transparent"
            placeholder="Confirmer le Mot de passe"
        />
    </div>
    <button class="w-full btn-sm btn btn-warning"> Confirmer </button>
</form>

<style>
    input:select {
        border: none;
    }
</style>
