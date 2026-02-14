<script lang="ts">
    import Main from "../../components/Main.svelte";
    import AdBanner from "../../components/AdBanner.svelte";
    import ProfileCertife from "../../components/ProfileCertife.svelte";
    import ProductCard from "../../components/ProductCard.svelte";
    import { articles } from "$lib/store/articles";

    let newArticles = $state($articles);

    let informatique = $state(
        newArticles.filter((article) =>
            article.category.includes("Informatique"),
        ),
    );

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
        <div class="flex carousel gap-4 carousel-center h-56 overflow-y-hidden">
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
            class="grid grid-cols-2 md:grid-cols-4 gap-1 items-center justify-center"
        >
            {#each $articles as article}
                <ProductCard product={article} />
            {/each}
        </div>
    </div>
</Main>
