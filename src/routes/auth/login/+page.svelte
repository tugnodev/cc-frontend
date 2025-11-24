<script>
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h2 class="text-3xl font-bold text-center mb-6">Connecte Toi</h2>

        <div class="form-control mb-4">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="label">
                <span class="label-text">Email</span>
            </label>
            <input
                type="email"
                placeholder="Entrez votre email"
                class="input input-bordered w-full"
            />
        </div>

        <div class="form-control mb-2">
            <!-- svelte-ignore a11y_label_has_associated_control -->
            <label class="label">
                <span class="label-text">Mot de passe</span>
            </label>
            <input
                type="password"
                placeholder="Entrez votre mot de passe"
                class="input input-bordered w-full"
            />
        </div>

        <div class="flex justify-between items-center mb-4">
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-success" />
                <span>Se souvenir de moi</span>
            </label>

            <a href="/auth/forgot" class="link link-hover text-sm text-primary"
                >Mot de passe oublié?</a
            >
        </div>

        <button class="btn btn-success w-full">Se connecter</button>

        <div class="divider">Ou connectez-vous avec</div>

        <div class="flex justify-center gap-4 my-4">
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="btn btn-circle"
                ><img src="/google.svg" class="w-5" /></button
            >
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button class="btn btn-circle"
                ><img src="/facebook.svg" class="w-5" /></button
            >
            <button class="btn btn-circle"
                ><img src="/apple.svg" class="w-6" /></button
            >
        </div>

        <p class="text-center">
            Pas encore de compte?
            <a href="/auth/register" class="link link-primary">Inscrivez-vous</a
            >
        </p>
    </div>
</div>
