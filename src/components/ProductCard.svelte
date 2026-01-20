<script lang="ts">
    import ModalBox from "./ModalBox.svelte";

    let modal = $state(false);
    let commentModal = $state(false);

    const actions = [
        { label: "Commander", callback: () => "void" },
        { label: "Ajouter au panier", callback: () => "void" },
    ];

    let product = {
        name: "Nom du produit",
        price: 99999,
        stock: 10,
        tags: ["tag", "tag2", "tag3"],
        rate: 4.5,
        description:
            "Description du produit Description du produit Description du produit",
        image: [
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
        ],
        comments: [
            {
                id: 1,
                author: "John Doe",
                content: "Great product!",
                rating: 5,
                date: "2023-01-01",
            },
            {
                id: 2,
                author: "Jane Smith",
                content: "Good quality",
                rating: 4,
                date: "2023-01-02",
            },
            {
                id: 3,
                author: "Alice Johnson",
                content: "Excellent product!",
                rating: 5,
                date: "2023-01-03",
            },
            {
                id: 4,
                author: "Bob Brown",
                content: "Very satisfied!",
                rating: 5,
                date: "2023-01-04",
            },
        ],
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
        <span class="aspect-square flex-1 rounded">
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
        <div
            class="flex flex-col items-center justify-center gap-2 w-full p-2 overflow-scroll"
        >
            <div
                class="carousel carousel-center w-full max-w-md md:max-w-2xl h-[50vh] md:h-[80vh] max-h-48 md:max-h-72 space-x-2 rounded"
            >
                {#each product.image as image}
                    <div class="carousel-item h-full">
                        <img
                            src={image}
                            class="aspect-square object-cover"
                            alt="Product Image"
                        />
                    </div>
                {/each}
            </div>
            <div class="flex flex-col gap-2 p-2 w-full">
                <span class="flex items-center justify-between">
                    <h3 class="text-xl sm:text-2xl font-semibold">
                        {product.name}
                    </h3>
                    <span>{product.stock} 📦</span>
                </span>
                <span class="flex items-center justify-between">
                    <h3 class="font-semibold">{product.price} FCFA</h3>
                    <span>{product.rate} 🌟</span>
                </span>
                <div class="flex gap-2">
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
            <div
                class="flex flex-col gap-2 p-2 max-h-[20vh] overflow-scroll no-scrollbar mb-12 w-full"
            >
                <button
                    onclick={() => (commentModal = true)}
                    class="btn btn-primary btn-soft btn-md w-full"
                    >Voir les commentaires</button
                >
            </div>
            <div
                class={`absolute flex gap-1 p-2 bg-base-200/10 backdrop-blur-2xl items-center bottom-0 z-20 w-full`}
            >
                {#each actions as action}
                    <button
                        onclick={() => action.callback()}
                        class={`btn flex-1 btn-soft ${action.label === "Ajouter au panier" ? "btn-primary" : "btn-accent"}`}
                        >{action.label}</button
                    >
                {/each}
            </div>
        </div>
    </ModalBox>
{/if}

{#if commentModal}
    <ModalBox onClose={() => (commentModal = false)}>
        <div
            class={`w-full p-2 flex flex-col gap-2 max-h-[80vh] overflow-scroll no-scrollbar`}
        >
            {#each product.comments as comment}
                <div
                    class="flex flex-col gap-2 border border-base-300 rounded-lg bg-base-200/10 backdrop-blur-2xl p-2 w-full"
                >
                    <span class="flex items-center justify-between">
                        <span class="flex items-center gap-2">
                            <span>{comment.rating} ⭐</span>
                            <span class="text-xl font-semibold"
                                >{comment.author}</span
                            >
                        </span>
                        <span class="text-base-content/60">{comment.date}</span>
                    </span>
                    <span>{comment.content}</span>
                </div>
            {/each}
            <div class="flex items-center gap-2">
                <input
                    class="input input-bordered w-full input-base-200 md:input-xl flex-4"
                    type="text"
                    placeholder="ecrire un commentaire"
                />
                <button
                    class="btn btn-base-300 btn-soft flex-1"
                    onclick={() => console.log("Comment envoyé")}>Envoye</button
                >
            </div>
        </div>
    </ModalBox>
{/if}
