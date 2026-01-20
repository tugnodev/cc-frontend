<script>
    import Main from "../../components/Main.svelte";
    import AdBanner from "../../components/AdBanner.svelte";
    import ProfileCertife from "../../components/ProfileCertife.svelte";
    import ProductCard from "../../components/ProductCard.svelte";
</script>

<Main>
    <AdBanner images={["/ads/ad1.jpg", "/ads/ad2.jpg", "/ads/ad3.jpg"]} />
    <div class="hidden">
        <ProfileCertife />
    </div>

    <div
        class="grid grid-cols-2 md:grid-cols-4 gap-1 w-full items-center justify-center"
    >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
    </div>
</Main>
