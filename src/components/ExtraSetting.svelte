<script>
    export let onLogout = () => {};
</script>

<div class="card w-full bg-base-100 shadow-xl p-6 space-y-4">
    <h2 class="text-2xl font-bold text-center mb-4">Mon Espace</h2>

    <a href="/orders" class="btn btn-outline w-full justify-start">
        📦 Mes commandes
    </a>

    <a href="/messages" class="btn btn-outline w-full justify-start">
        💬 Ma messagerie
    </a>

    <a href="/wishlist" class="btn btn-outline w-full justify-start">
        ❤️ Ma wishlist
    </a>

    <button class="btn btn-error w-full mt-4" on:click={onLogout}>
        Se déconnecter
    </button>
</div>
