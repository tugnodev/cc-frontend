<script>
    // @ts-nocheck

    import ExtraSettings from "../../../components/ExtraSettings.svelte";

    function logout() {
        alert("Déconnecté !");
        // logiques : remove token, redirect...
    }
</script>

<div class="min-h-screen bg-base-200 flex justify-center p-6">
    <ExtraSettings onLogout={logout} />
</div>
