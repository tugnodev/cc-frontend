<script>
    import ModalBox from "./ModalBox.svelte";

    let modal = $state(false);

    let product = {
        name: "Nom du produit",
        price: 99999,
        stock: 10,
        tags: ["tag", "tag2", "tag3"],
        rate: 4.5,
        description:
            "Description du produit Description du produit Description du produit",
        image: ["/profile.png", "/profile.png", "/profile.png"],
    };
</script>

<div
    role="button"
    tabindex="0"
    onclick={() => (modal = true)}
    onkeydown={(e) => {
        if (e.key === "Enter") {
            modal = true;
        }
    }}
    class=""
>
    <div class="avatar">
        <span class="w-48 rounded">
            <img src="/profile.png " alt="profile" />
        </span>
    </div>
    <div class="flex flex-col w-full">
        <h3 class="">{product.name}</h3>
        <h3 class="font-semibold">{product.price} FCFA</h3>
    </div>
</div>

{#if modal}
    <ModalBox onClose={() => (modal = false)}>
        <div class="flex flex-col gap-2 w-full">
            <div
                class="carousel carousel-center w-full h-52 max-w-md space-x-4 p-2"
            >
                {#each product.image as image}
                    <div class="carousel-item">
                        <img
                            src={image}
                            class="w-full h-full object-cover"
                            alt="Product Image"
                        />
                    </div>
                {/each}
            </div>
            <div class="divider"></div>
            <div class="flex flex-col gap-2 p-2 w-full">
                <span class="flex items-center justify-between">
                    <h3 class="text-2xl font-semibold">{product.name}</h3>
                    <span>{product.stock} 📦</span>
                </span>
                <span class="flex items-center justify-between">
                    <h3 class="font-semibold">{product.price} FCFA</h3>
                    <span>{product.rate} 🌟</span>
                </span>
                <div>
                    {#each product.tags as tag}
                        <span class="badge badge-soft badge-warning text-sm"
                            >{tag}</span
                        >
                    {/each}
                </div>
                <h3>Description du produit</h3>
                <p class="text-sm text-gray-500">
                    {product.description}
                </p>
            </div>
            <div class="divider"></div>
            <div class="flex flex-col gap-2 p-2 w-full">
                <h1>Hello World</h1>
            </div>
        </div>
    </ModalBox>
{/if}
