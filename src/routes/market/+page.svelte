<script lang="ts">
    import Main from "../../components/Main.svelte";
    import AdBanner from "../../components/AdBanner.svelte";
    import ProfileCertife from "../../components/ProfileCertife.svelte";
    import ProductCard from "../../components/ProductCard.svelte";
    import type { articleDto } from "../../services/dtos/article";
    import { articles } from "../../store/articles";

    articles.set([
        {
            id: "xxxxxxxxx",
            userId: "xxxxxxxxx",
            title: "Nom du produit",
            price: 99999,
            stock: 10,
            category: ["tag", "tag2", "tag3"],
            rates: 4.5,
            description:
                "Description du produit Description du produit Description du produit",
            images: [
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "xxxxxxxxx",
            userId: "xxxxxxxxx",
            title: "Nom du produit",
            price: 99999,
            stock: 10,
            category: ["tag", "tag2", "tag3"],
            rates: 4.5,
            description:
                "Description du produit Description du produit Description du produit",
            images: [
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "xxxxxxxxx",
            userId: "xxxxxxxxx",
            title: "Nom du produit",
            price: 99999,
            stock: 10,
            category: ["tag", "tag2", "tag3"],
            rates: 4.5,
            description:
                "Description du produit Description du produit Description du produit",
            images: [
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "xxxxxxxxx",
            userId: "xxxxxxxxx",
            title: "Nom du produit",
            price: 99999,
            stock: 10,
            category: ["tag", "tag2", "tag3"],
            rates: 4.5,
            description:
                "Description du produit Description du produit Description du produit",
            images: [
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "xxxxxxxxx",
            userId: "xxxxxxxxx",
            title: "Nom du produit",
            price: 99999,
            stock: 10,
            category: ["tag", "tag2", "tag3"],
            rates: 4.5,
            description:
                "Description du produit Description du produit Description du produit",
            images: [
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "xxxxxxxxx",
            userId: "xxxxxxxxx",
            title: "Nom du produit",
            price: 99999,
            stock: 10,
            category: ["tag", "tag2", "tag3"],
            rates: 4.5,
            description:
                "Description du produit Description du produit Description du produit",
            images: [
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
                "/profile.png",
            ],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
</script>

<Main>
    <AdBanner images={["/ads/ad1.jpg", "/ads/ad2.jpg", "/ads/ad3.jpg"]} />
    <div class="hidden">
        <ProfileCertife />
    </div>

    <div
        class="grid grid-cols-2 md:grid-cols-4 gap-1 w-full items-center justify-center"
    >
        {#each $articles as article}
            <ProductCard product={article} />
        {/each}
    </div>
</Main>
