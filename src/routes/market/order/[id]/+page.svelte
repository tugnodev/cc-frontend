<script lang="ts">
    import Main from "../../../../components/Main.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { TokenManager } from "$lib/token";
    import { goto } from "$app/navigation";
    import { BackendFetch } from "$lib/backend";
    import type { articleDto } from "$lib/services/dtos/article";
    import type { userDto } from "$lib/services/dtos/user";
    import Spinner from "../../../../components/Spinner.svelte";

    let product = $state<articleDto | null>(null);
    let vendor = $state<userDto | null>(null);
    let loading = $state(true);
    let quantity = $state(1);

    onMount(async () => {
        const tm = new TokenManager();
        const token = await tm.loadToken();
        if (token === null || token === undefined) {
            goto("/auth/login");
        }

        const fetch = new BackendFetch(token as string);
        const productId = $page.params.id;

        // Fetch product details
        const productRes = await fetch.get<articleDto>(
            `/articles/${productId}`,
        );
        product = productRes;

        // Fetch vendor details
        if (product) {
            const vendorRes = await fetch.get<userDto>(
                `/users/${product.userId}`,
            );
            vendor = vendorRes;
        }

        loading = false;
    });

    const handleOrder = async () => {
        if (!product) return;

        const tm = new TokenManager();
        const token = await tm.loadToken();
        if (token === null || token === undefined) {
            goto("/auth/login");
        }

        const fetch = new BackendFetch(token as string);
        const orderData = {
            articleId: product.id,
            quantity: quantity,
            totalPrice: product.price * quantity,
        };

        try {
            await fetch.post("/orders", orderData);
            alert("Order placed successfully!");
            goto("/market");
        } catch (error) {
            alert("Failed to place order. Please try again.");
        }
    };
</script>

<Main>
    {#if loading}
        <Spinner color="bg-base-200" />
    {:else if product && vendor}
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-4">Place Order</h1>

            <!-- Product Details -->
            <div class="bg-base-100 p-4 rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-semibold mb-2">Product Details</h2>
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
                        <p class="text-lg font-bold">${product.price}</p>
                        <p class="text-sm text-gray-500">
                            Category: {product.category.join(", ")}
                        </p>
                        <p class="text-sm text-gray-500">
                            Stock: {product.stock}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Vendor Details -->
            <div class="bg-base-100 p-4 rounded-lg shadow-md mb-6">
                <h2 class="text-xl font-semibold mb-2">Vendor Details</h2>
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
                <h2 class="text-xl font-semibold mb-2">Order Form</h2>
                <div class="flex items-center gap-4 mb-4">
                    <input
                        type="number"
                        bind:value={quantity}
                        min="1"
                        max={product.stock}
                        class="input input-bordered w-20"
                    />
                </div>
                <p class="text-lg font-bold mb-4">
                    Total: ${product.price * quantity}
                </p>
                <button onclick={handleOrder} class="btn btn-primary w-full">
                    Place Order
                </button>
            </div>
        </div>
    {:else}
        <p class="text-center text-gray-500">Product or vendor not found.</p>
    {/if}
</Main>
