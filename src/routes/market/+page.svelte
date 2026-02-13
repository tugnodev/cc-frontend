<script lang="ts">
    import Main from "../../components/Main.svelte";
    import AdBanner from "../../components/AdBanner.svelte";
    import ProfileCertife from "../../components/ProfileCertife.svelte";
    import ProductCard from "../../components/ProductCard.svelte";
    import type { articleDto } from "../../services/dtos/article";
    import { articles } from "../../store/articles";
    import { onMount } from "svelte";
    import { BackendFetch } from "$lib/backend";
    articles.set([
        {
            id: "xxxxxxxxx",
            userId: "xxxxxxxxx",
            title: "Nom du produit",
            price: 99999,
            stock: 10,
            category: ["Informatique", "tag2", "tag3"],
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
            category: ["Informatique", "tag2", "tag3"],
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
            category: ["Informatique", "tag2", "tag3"],
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
            category: ["Informatique", "tag2", "tag3"],
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

    let newArticles = $state($articles);
    $inspect(newArticles);

    let informatique = $state(
        newArticles.filter((article) =>
            article.category.includes("Informatique"),
        ),
    );

    $inspect(informatique);

    let electronics = $state(
        newArticles.filter((article) =>
            article.category.includes("Maison & Électronique"),
        ),
    );

    let others = $state(
        newArticles.filter(
            (article) =>
                !article.category.includes("Informatique") &&
                !article.category.includes("Maison & Électronique"),
        ),
    );
</script>

<Main>
    <AdBanner images={["/ads/ad1.jpg", "/ads/ad2.jpg", "/ads/ad3.jpg"]} />
    <div class="hidden">
        <ProfileCertife />
    </div>

    <!-- Top list -->
    <div
        class="gap-2 flex flex-col bg-warning-content/50 p-2 jutify-start w-full overflow-x-scroll"
    >
        <div class="w-full p-1">
            <h2 class="text-xl badge badge-warning badge-soft font-semibold">
                Top Produits 🏅
            </h2>
        </div>
        <div class="flex carousel gap-2 carousel-center h-56 overflow-y-hidden">
            {#each informatique as inf}
                <div class="carousel-item max-w-44">
                    <ProductCard product={inf} />
                </div>
            {/each}
        </div>
    </div>

    <!-- news -->
    <div class="w-full">
        <div class="w-full my-2 rounded p-2 bg-primary-content">
            <h2 class="text-xl badge badge-primary badge-soft font-semibold">
                Nouveaux ⏳
            </h2>
        </div>
        <div
            class="grid grid-cols-3 md:grid-cols-4 gap-1 items-center justify-center"
        >
            {#each $articles as article}
                <ProductCard product={article} />
            {/each}
        </div>
    </div>
</Main>
