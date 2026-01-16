<script>
    import Main from "../../../components/Main.svelte";
    import AdBanner from "../../../components/AdBanner.svelte";
    import Commande from "../../../components/Commande.svelte";
</script>

<Main>
    <AdBanner images={["/ads/ad1.jpg", "/ads/ad2.jpg", "/ads/ad3.jpg"]} />

    <Commande />
    <h1>Welcome to CC teste</h1>
</Main>
