<script>
    import { fade } from "svelte/transition";
    
    const  url = "http://localhost:3000/register";
    let name = "";
    let email = "";
    let password = "";
    let confirmPassword = "";
    let agree = false;
    let loading = false;
    let errorMsg = "";
    let successMsg = "";


    async function signUp(e) {
        e.preventDefault();
        errorMsg = "";
        successMsg = "";

        if (!name || !email || !password) {
            errorMsg = "Tous les champs sont obligatoires.";
            return;
        }

        if (password !== confirmPassword) {
            errorMsg = "Les mots de passe ne correspondent pas.";
            return;
        }

        if (!agree) {
            errorMsg = "Vous devez accepter les conditions.";
            return;
        }

        loading = true;

        try {
         const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          });

            successMsg = "Compte créé avec succès !";
            console.log(response.json());
            window.location.href = "/login";
        } catch (err) {
            errorMsg = "Erreur lors de l'inscription.";
            console.error(err);
          
        }

        loading = false;
    }
</script>

<div class="flex h-full w-full items-center justify-center overflow-y-scroll">
    <div
        transition:fade={{ duration: 150 }}
        class="card bg-base-100 h-full md:h-auto w-full max-w-md shadow-sm p-6 border-2 border-base-300"
    >
        <h2 class="text-3xl font-bold text-center mb-6">Inscrivez-vous</h2>

        {#if errorMsg}
            <div class="alert alert-error mb-4">
                {errorMsg}
            </div>
        {/if}

        {#if successMsg}
            <div class="alert alert-success mb-4">
                {successMsg}
            </div>
        {/if}

        <form on:submit={signUp}>
            <!-- Name -->
            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Nom</span>
                </label>
                <input
                    type="text"
                    bind:value={name}
                    placeholder="Entrez votre nom"
                    class="input input-bordered w-full"
                />
            </div>
        
            <!-- Email -->
            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input
                    type="email"
                    bind:value={email}
                    placeholder="Entrez votre email"
                    class="input input-bordered w-full"
                />
            </div>

            <!-- Password -->
            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Mot de passe</span>
                </label>
                <input
                    type="password"
                    bind:value={password}
                    placeholder="Entrez votre mot de passe"
                    class="input input-bordered w-full"
                />
            </div>

            <!-- Confirm password -->
            <div class="form-control mb-4">
                <label class="label">
                    <span class="label-text">Confirmer le mot de passe</span>
                </label>
                <input
                    type="password"
                    bind:value={confirmPassword}
                    placeholder="Confirmez votre mot de passe"
                    class="input input-bordered w-full"
                />
            </div>

            <!-- Terms -->
            <label class="flex items-center gap-3 mb-4 cursor-pointer">
                <input
                    type="checkbox"
                    bind:checked={agree}
                    class="checkbox checkbox-success"
                />
                <span class="text-sm leading-tight">
                    J'accepte les
                    <a
                        class="text-primary font-medium cursor-pointer"
                        href="/terms">Conditions d'utilisation</a
                    >
                    et la
                    <a
                        class="text-primary font-medium cursor-pointer"
                        href="/privacy">Politique de confidentialité</a
                    >.
                </span>
            </label>

            <!-- Submit -->
            <button class="btn btn-success w-full" disabled={loading}>
                {loading ? "Chargement..." : "S'inscrire"}
            </button>

            <div class="divider">Ou connectez-vous avec</div>

            <div class="flex justify-center gap-4 my-4">
                <button type="button" class="btn btn-circle border-base-300">
                    <img src="/google.svg" alt="Google" class="w-5" />
                </button>
                <button type="button" class="btn btn-circle border-base-300">
                    <img src="/facebook.svg" alt="Facebook" class="w-5" />
                </button>
                <button type="button" class="btn btn-circle border-base-300">
                    <img src="/apple.svg" alt="Apple" class="w-6" />
                </button>
            </div>
        </form>

        <p class="text-center">
            Vous avez déjà un compte ?
            <a href="/auth/login" class="link link-primary">Connectez-vous</a>
        </p>
    </div>
</div>
