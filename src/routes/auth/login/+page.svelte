<script>
</script>

<div class="container">
    <h2>Connecte Toi</h2>

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>Email</label>
    <input type="email" placeholder="Entrez votre Email" />

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label>Mot de passe</label>
    <input type="password" placeholder="Entrez votre mot de passe" />

    <div
        style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;"
    >
        <label style="display:flex; align-items:center; gap:8px;">
            <input type="checkbox" />
            Me souvenir
        </label>

        <a href="/auth/forgot">Mot de passe oublié?</a>
    </div>

    <button class="btn">Se connecter</button>

    <p style="text-align:center; margin-top:15px;">Se connecter avec</p>

    <div class="google-btns">
        <button>G</button>
        <button>F</button>
        <button>A</button>
    </div>

    <p style="text-align:center; margin-top:20px;">
        Pas encore de compte?
        <a href=" ">S'inscrire</a>
    </p>
</div>
