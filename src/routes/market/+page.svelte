<script lang="ts">
    import Main from "../../components/Main.svelte";
    import AdBanner from "../../components/AdBanner.svelte";
    import ProfileCertife from "../../components/ProfileCertife.svelte";
    import ProductCard from "../../components/ProductCard.svelte";
    import { articles } from "$lib/store/articles";
    import { onMount } from "svelte";
    import { TokenManager } from "$lib/token";
    import { goto } from "$app/navigation";
    import { BackendFetch } from "$lib/backend";
    import type { articleDto } from "$lib/services/dtos/article";
    import Spinner from "../../components/Spinner.svelte";

    onMount(async () => {
        if ($articles.length > 0) {
            loading = false;
        } else {
            const tm = new TokenManager();
            const token = await tm.loadToken();
            if (token === null || token === undefined) {
                goto("/auth/login");
            }
            const fetch = new BackendFetch(token as string);
            const res = (await fetch.get<articleDto[]>(
                "/articles/all",
            )) as articleDto[];
            articles.set(res);
            loading = false;
        }
    });
    let loading = $state(true);

    let informatique = $derived(
        $articles.filter((article) =>
            article.category.includes("Informatique"),
        ),
    );
</script>

<Main>
    {#if loading}
        <Spinner color="bg-base-200" />
    {:else}
        <AdBanner images={["/ads/ad1.jpg", "/ads/ad2.jpg", "/ads/ad3.jpg"]} />
        <div class="hidden">
            <ProfileCertife />
        </div>

        <!-- Top list -->
        <div
            class="gap-2 flex flex-col bg-warning-content/50 p-2 jutify-start w-full overflow-x-scroll"
        >
            <div class="w-full p-1">
                <h2
                    class="text-xl badge badge-warning badge-soft font-semibold"
                >
                    Top Produits 🏅
                </h2>
            </div>
            <div
                class="flex gap-4 h-56 overflow-x-auto snap-x snap-mandatory scroll-smooth overflow-y-hidden"
            >
                {#each informatique as inf}
                    <div class="w-44 shrink-0 snap-center h-full">
                        <ProductCard product={inf} />
                    </div>
                {/each}
            </div>
        </div>

        <!-- news -->
        <div class="w-full">
            <div class="w-full my-2 rounded p-2 bg-primary-content">
                <h2
                    class="text-xl badge badge-primary badge-soft font-semibold"
                >
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
    {/if}
</Main>
