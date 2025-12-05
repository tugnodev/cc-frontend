<script>
    import { Package, MessageCircle, Heart, LogOut } from "@lucide/svelte";
    export let onLogout = () => {};
</script>

<div class="card w-full max-w-md bg-base-100 shadow-xl p-6 space-y-4">
    <h2 class="text-2xl font-bold text-center mb-4">Mon Espace</h2>

    <!-- Mes commandes -->
    <a href="/market/orders" class="btn btn-outline w-full justify-start gap-2">
        <Package class="w-5 h-5" /> Mes commandes
    </a>

    <!-- Messagerie -->
    <a
        href="/market/messages"
        class="btn btn-outline w-full justify-start gap-2"
    >
        <MessageCircle class="w-5 h-5" /> Ma messagerie
    </a>

    <!-- Wishlist -->
    <a
        href="/market/wishlist"
        class="btn btn-outline w-full justify-start gap-2"
    >
        <Heart class="w-5 h-5" /> Ma wishlist
    </a>

    <!-- Déconnexion -->
    <button
        class="btn btn-error w-full mt-4 justify-start gap-2"
        on:click={onLogout}
    >
        <LogOut class="w-5 h-5" /> Se déconnecter
    </button>
</div>
