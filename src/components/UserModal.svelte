<script>
</script>

<form
    class="flex flex-col w-full h-full items-center justify-center gap-4 p-2"
    action=""
>
    <h1 class="text-2xl font-semibold">
        {`Modifier le profile`.toUpperCase()}
    </h1>

    <button class="w-42 h-42">
        <img class="rounded-full" src="/profile.png" alt="" />
    </button>

    <div class="w-full flex flex-col item-center gap-2 justify-center">
        <input
            value={`Racine DIOP`}
            class="input input-border bg-transparent w-full"
            type="text"
            placeholder="Nom Complet"
        />
        <input
            value={`tugnodev`}
            class="w-full input input-border bg-transparent"
            type="text"
            placeholder="Nom d'utilisateur"
        />
        <input
            value={`mailofracine1@gmail.com`}
            class="input input-border bg-transparent w-full"
            type="email"
            placeholder="Email"
        />
    </div>
    <div class="w-full flex item-center justify-center gap-2">
        <input
            value={`781234567`}
            class="w-full input input-border bg-transparent"
            type="number"
            placeholder="Numero de telephone"
        />
        <button class="btn btn-soft btn-md btn-info"> Ajouter </button>
    </div>
    <div class="flex flex-col item-center gap-2 justify-center w-full">
        <input
            type="password"
            class="w-full input input-border bg-transparent"
            placeholder="Ancien Mot de passe"
        />
        <input
            type="password"
            class="w-full input input-border bg-transparent"
            placeholder="Nouveau Mot de passe"
        />
        <input
            type="password"
            class="w-full input input-border bg-transparent"
            placeholder="Confirmer le Mot de passe"
        />
    </div>
    <button class="w-full btn btn-soft btn-warning"> Confirmer </button>
</form>

<style>
    input:select {
        border: none;
    }
</style>
