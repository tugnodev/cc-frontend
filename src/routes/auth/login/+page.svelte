<script>
</script>

<div class="container">
    <h2>Connecte Toi</h2>

    <label>Email</label>
    <input type="email" placeholder="Entrez votre Email" />

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
        <a href="">S'inscrire</a>
    </p>
</div>

<style>
    .container {
        max-width: 400px;
        margin: auto;
        padding: 2rem;
        border-radius: 20px;
        background: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        margin-top: 15%;
    }

    input {
        width: 100%;
        padding: 12px;
        border-radius: 10px;
        border: 1px solid #ddd;
        margin-top: 10px;
    }

    .btn {
        width: 100%;
        padding: 14px;
        background: #0b513f;
        color: white;
        border: none;
        border-radius: 10px;
        margin-top: 20px;
        cursor: pointer;
        font-weight: bold;
    }

    .google-btns {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-top: 20px;
    }

    .google-btns button {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        background: #f3f3f3;
    }

    a {
        color: #0a7564;
        font-weight: bold;
    }
    h2 {
        text-align: center;
    }
</style>
