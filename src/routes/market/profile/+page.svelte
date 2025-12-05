<script>
    import ExtraSetting from "../../../components/ExtraSetting.svelte";

    function logout() {
        alert("Déconnecté !");
    }
</script>

<div class="min-h-screen bg-base-200 flex justify-center items-start p-6">
    <ExtraSetting onLogout={logout} />
</div>
