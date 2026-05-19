<script lang="ts">
    import { page } from "$app/state";
    import Main from "../../../components/Main.svelte";
    import { BackendFetch } from "$lib/backend";
    import type { articleDto } from "$lib/services/dtos/article";
    import type { userDto } from "$lib/services/dtos/user";
    import { TokenManager } from "$lib/token";
    import { onMount } from "svelte";
    import Spinner from "../../../components/Spinner.svelte";
    import { MoveLeftIcon } from "@lucide/svelte";
    import { window } from "@tauri-apps/api";
    import { goto } from "$app/navigation";
    import type { createOrderDto } from "$lib/services/dtos/order";
    import { user } from "$lib/store/users";

    const articleId = $derived(page.params.slug);
    let loading = $state(true);
    let product: articleDto | undefined = $state(undefined);
    let vendor: userDto | undefined = $state(undefined);

    const init = async () => {
        const tm = new TokenManager();
        let fetch: BackendFetch;
        {
            const token = await tm.loadToken();
            fetch = new BackendFetch(token!);
        }

        const articleFetch: articleDto = await fetch.get(
            `/articles/${articleId}`,
        );
        console.log(articleFetch);
        const sellerFetch: userDto = await fetch.get(`/${articleFetch.userId}`);
        console.log(sellerFetch);
        product = articleFetch;
        vendor = sellerFetch;
        loading = false;
    };

    const handleOrder = async () => {
        if (!product) return;

        const tm = new TokenManager();
        const token = await tm.loadToken();
        if (token === null || token === undefined) {
            goto("/auth/login");
        }

        const fetch = new BackendFetch(token as string);
        const orderData: createOrderDto = {
            items: [
                {
                    articleId: product.id,
                    quantity: 1,
                },
            ],
            buyerId: "",
            sellerId: product.userId,
        };

        (await user.get()).subscribe((user) => {
            if (user) {
                orderData.buyerId = user.id;
            }
        });

        try {
            console.log(JSON.stringify(orderData));
            const res = await fetch.post("/order", orderData);
            console.log(JSON.stringify(res));
            goto("/market");
        } catch (error) {
            alert("Failed to place order. Please try again.");
        }
    };

    onMount(async () => {
        await init();
    });
</script>

<main>
    {#if loading}
        <div class="w-full h-screen flex items-center justify-center">
            <Spinner color="bg-base-200" />
        </div>
    {:else if product && vendor}
        <div class="w-full h-screen">
            <h1
                class="text-2xl w-full font-bold flex items-center justify-between px-2 gap-2"
            >
                <button onclick={() => goto("/market")}>
                    <MoveLeftIcon />
                </button> Commander
            </h1>

            <!-- Product Details -->
            <div class="bg-base-100 p-4 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-2">Produit</h2>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="w-full md:w-1/3">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            class="w-full h-48 object-cover rounded-lg"
                        />
                    </div>
                    <div class="w-full md:w-2/3">
                        <h3 class="text-lg font-semibold">{product.title}</h3>
                        <p class="text-gray-600 mb-2">{product.description}</p>
                        <p class="text-lg font-bold">{product.price} XOF</p>
                        <p class="text-sm text-gray-500">
                            Categorie: {product.category.join(", ")}
                        </p>
                        <p class="text-sm text-gray-500">
                            Stock: {product.stock}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Vendor Details -->
            <div class="bg-base-100 p-4 rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-semibold mb-2">Vendeur</h2>
                <div class="flex items-center gap-4">
                    {#if vendor.image}
                        <img
                            src={vendor.image}
                            alt={vendor.name}
                            class="w-16 h-16 rounded-full object-cover"
                        />
                    {/if}
                    <div>
                        <h3 class="text-lg font-semibold">{vendor.name}</h3>
                        <p class="text-gray-600">{vendor.email}</p>
                        <p class="text-sm text-gray-500">
                            Address: {vendor.address || "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Order Form -->
            <div class="bg-base-100 p-4 rounded-lg shadow-md">
                <button onclick={handleOrder} class="btn btn-primary w-full">
                    Commander
                </button>
            </div>
        </div>
    {:else}
        <p class="text-center text-gray-500">Product or vendor not found.</p>
    {/if}
</main>
