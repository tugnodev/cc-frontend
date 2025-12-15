<script lang="ts">
    import { backendFetch } from "../lib/backend";

    let email = "";
    let password = "";
    let rememberMe = false;
    let csrf_token = "";
    const requeste = new backendFetch();

    function login(event?: Event) {
        event?.preventDefault?.();

        if (!email.trim() || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        console.log({ email, password, rememberMe });

        requeste
            .post("/user/login", { email, password })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div
        class="card w-full max-w-md bg-base-100 shadow-xl p-6 border border-base-300"
    >
        <form action="" onsubmit={login}>
            <input type="hidden" name="csrf_token" value={csrf_token} />
            <h2 class="text-3xl font-bold text-center mb-6">Connectez-vous</h2>

            <div class="form-control mb-4">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input
                    type="email"
                    bind:value={email}
                    placeholder="Entrez votre email"
                    class="input input-bordered w-full border-base-300"
                />
            </div>

            <div class="form-control mb-2">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                    <span class="label-text">Mot de passe</span>
                </label>
                <input
                    type="password"
                    bind:value={password}
                    placeholder="Entrez votre mot de passe"
                    class="input input-bordered w-full border-base-300"
                />
            </div>

            <div class="flex justify-between items-center mb-4">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        class="checkbox checkbox-success"
                        bind:checked={rememberMe}
                    />
                    <span>Se souvenir de moi</span>
                </label>

                <a
                    href="/auth/forgot"
                    class="link link-hover text-sm text-primary"
                    >Mot de passe oublié?</a
                >
            </div>

            <button class="btn btn-success w-full">Se connecter</button>

            <div class="divider">Ou connectez-vous avec</div>

            <div class="flex justify-center gap-4 my-4">
                <button class="btn btn-circle border-base-300">
                    <img src="/google.svg" alt="Logo Google" class="w-5" />
                </button>
                <button class="btn btn-circle border-base-300">
                    <img src="/facebook.svg" alt="Logo Facebook" class="w-5" />
                </button>
                <button class="btn btn-circle border-base-300">
                    <img src="/apple.svg" alt="Logo Apple" class="w-6" />
                </button>
            </div>
        </form>

        <p class="text-center">
            Pas encore de compte?
            <a href="/auth/signup" class="link link-primary">Inscrivez-vous</a>
        </p>
    </div>
</div>
