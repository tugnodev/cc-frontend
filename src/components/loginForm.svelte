<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let {
        isLoading = $bindable(false),
        error = $bindable<string | null>(null),
    } = $props();

    let email = $state("");
    let password = $state("");
    let rememberMe = $state(false);
    let showPassword = $state(false);

    const dispatch = createEventDispatcher<{
        login: { email: string; password: string; rememberMe: boolean };
    }>();

    function handleSubmit(event: Event) {
        event.preventDefault();
        error = null;

        // Validation des champs
        if (!email.trim() || !password.trim()) {
            error = "Veuillez remplir tous les champs.";
            return;
        }

        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            error = "Veuillez entrer une adresse email valide.";
            return;
        }

        // Validation mot de passe (minimum 6 caractères)
        if (password.length < 6) {
            error = "Le mot de passe doit contenir au moins 6 caractères.";
            return;
        }

        // Dispatch login event avec les valeurs nettoyées
        dispatch("login", {
            email: email.trim(),
            password,
            rememberMe,
        });
    }

    function togglePasswordVisibility() {
        showPassword = !showPassword;
    }
</script>

<form
    onsubmit={handleSubmit}
    class="card w-full max-w-md bg-base-100 shadow-xl p-6 border border-base-300"
>
    <h2 class="text-3xl font-bold text-center mb-6">Connectez-vous</h2>

    <div class="form-control mb-4">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="label">
            <span class="label-text">Email</span>
        </label>
        <input
            id="email"
            type="email"
            bind:value={email}
            required
            placeholder="Entrez votre email"
            class="input input-bordered w-full border-base-300"
        />
    </div>

    <div class="form-control mb-2">
        <!-- svelte-ignore a11y_label_has_associated_control -->
        <label class="label">
            <span class="label-text">Mot de passe</span>
        </label>
        <div class="relative">
            <input
                id="password"
                type={showPassword ? "text" : "password"}
                bind:value={password}
                required
                placeholder="Entrez votre mot de passe"
                class="input input-bordered w-full pr-10 border-base-300"
            />
            <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-circle"
                onclick={togglePasswordVisibility}
                aria-label={showPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"}
            >
                {#if showPassword}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19l-3.42-3.42a4 4 0 0 0-5.66-5.66l-3.42-3.42z"
                        />
                        <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                {:else}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        />
                        <circle cx="12" cy="12" r="3" />
                    </svg>
                {/if}
            </button>
        </div>
    </div>

    <div class="flex justify-between items-center mb-4">
        <label class="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                bind:checked={rememberMe}
                class="checkbox checkbox-success"
            />
            <span>Se souvenir de moi</span>
        </label>
        <a href="/auth/forgot" class="link link-hover text-sm text-primary"
            >Mot de passe oublié?</a
        >
    </div>

    {#if error}
        <div class="alert alert-error mb-4" role="alert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            <span>{error}</span>
        </div>
    {/if}

    <button type="submit" class="btn btn-success w-full" disabled={isLoading}>
        {#if isLoading}
            <span class="loading loading-spinner"></span>
            Connexion en cours...
        {:else}
            Se connecter
        {/if}
    </button>

    <div class="divider">Ou connectez-vous avec</div>

    <div class="flex justify-center gap-4 my-4">
        <button
            type="button"
            class="btn btn-circle border-base-300"
            onclick={() => console.log("Google login")}
        >
            <img src="/google.svg" alt="Logo Google" class="w-5" />
        </button>
        <button
            type="button"
            class="btn btn-circle border-base-300"
            onclick={() => console.log("Facebook login")}
        >
            <img src="/facebook.svg" alt="Logo Facebook" class="w-5" />
        </button>
        <button
            type="button"
            class="btn btn-circle border-base-300"
            onclick={() => console.log("Apple login")}
        >
            <img src="/apple.svg" alt="Logo Apple" class="w-6" />
        </button>
    </div>

    <p class="text-center">
        Pas encore de compte?
        <a href="/auth/signup" class="link link-primary">Inscrivez-vous</a>
    </p>
</form>
