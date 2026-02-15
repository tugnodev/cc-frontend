<script lang="ts">
    type Item = {
        id: number;
        name: string;
        price: number;
        image: string;
    };

    type Card = {
        id: string;
        card_details: Item[];
        user_id: string;
    };

    let cart: Item[] = [
        {
            id: 1,
            name: "Ordinateur portable tug",
            price: 150000,
            image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: 2,
            name: "Foulard Bambey Bombekill",
            price: 7500,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvpPQShVNKxD_TXhpBsmde1NTlP9_ip1UMLA&sxBsao4udm1jyhNlUwlOHE8lbWJHVBCEJgCEIQAIQhAAk+3jdn936U4SrbmF7zKDpedZ3cFzerUyu0k64cvH7oaENSqCS0E5uV/UBK/44uLhLmhrg1xIIMwDad1xdMzs1w8LBlb/wCPlx81NQwRMyLEQSCHDhoRc/JeOj026Mu3sb9mBSAZIaHOmCfak21sZvfgrOG2eHw514gX/C4kFT4fY7GEOaAI374kWPWE0ZSgLvdN6XKmffN7iFdPZrWttIgudbWXElx63PqtdxnY1tUTiH1DTB8GGpEtZGgD4vUdxcY1NwFvWRZ06e/evRRE4o1/ZPZ6jh2/V0qdK0ENF4tALtXJ1Tp2Uzqc3PkPivKaGhpYPMnTzS/aOyzWaWvIynUDMJHO/wAU1XsKudUZrDLI2OLyjRO0HYvvRLCMw4iS6BYZj7F40B99lOxvotBf3uLqFx3U2EhoHAu1K6gQsVOC7IKEeEbP9Rv+H8PO3InqdnMOcs0xDRDRubpo3TcEyw+Gaxoa0QBb9yrEheJ5MkrZyWGyCjhGNcXADMQAXbyBorCAUJkG2+TEtWQXpXkoEehewsS6NVlKBEtDVTKDDm6nTQAhCEwBCEIAEIQgAVbFtmPP4Kyq+L3fvgoyWwFN9EHcFgGwNFOSoXc1V2pDBrgsmvVd5KzpGU8+BloBZtWFNelysQjCsUNduUeIKia7elkC4HcF69yrNdNtFJ3kWPr80ZAzK9BUQ5Lwnh6JASFeSoHVukKRj+d93NAEjSvSYUTiFGXnz/NAFjvN2i8z8VUFfjosi+yWRlwFBICotqHd/lT0sQDYoTFgu4bU/krCqYSJsbQrasjwIEIQmAIQhAAhCEACgxG7z+CnVXG7vNJgQulQ1D8/Les6dUOtvCHHfw/ZUBntMWnp/lYZpXlJwhzeH7CwBtPBAExP79Vi9kfJZU3Sf3wssohMCvUqtI4FQseNx+C82lTiD6qjQr+LKoN4e4DZhvB8lhVe7UXjcoXVbX1Fx03r3NNwZTyBn3k+Jtjw4rOniAfEP7gqkzpYqtUrkHNpucFHOBjeqQev5qk6tGmm7rwKgq4mRLdR4hzG8KCpiQfEPZdry5+vvTbAvDFTbfqPioxiQfCfLy+ISTaNZzfEy7h4uoGsc4+Chq1+8aHtdAMOB3seND/SdCOaXcA3fjoflO/Tnx81apVQLE+F2h4FazXrtrsLXnI4XJGrHC2dvIWnkQVVw+230nmjiQLiztGu4O0tPG/zWQNnxOOdTd4tARfiDYeakfiQ5udp015cUodj6dVppuImIBcNQfsu4i/vkTqqGGxDqToJkey68wQLST+Gb74BSb3Gbr2cxmdzhvAv6x+YI8k+Wm9jDGIqj8AI3iJA9Yj3LcldDgiwQhCmIEIQgAQhCABU8b7TOp+CEJMCgP5pU79T+/uoQoEirhv0j81Kz5/FCElwBlhNB++KsO+PyQhSXAinj/ZPVJ9/mhCrs5Gi3W1b/V8CjAr1CFyHg9xPthU8Xq/98EISYIr4fd0P5hVW+yelT80IQBjivsfv7D0u2J7A/wBR3xQhLyh+Cu3/AOS3p/8AkVV7SfyaHn/6tQhJ8MSKzf5dL/SP5lWa3tn/AE6H/sEISGbd9H386p/pt+C3tCFfX90iwQhCsECEIQB//9k=",
        },
        {
            id: 3,
            name: "Souris de Sira",
            price: 12000,
            image: "data:image/jpeg;base64,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",
        },
    ];
    let totalPrice = cart.reduce((acc, item) => acc + item.price, 0);
    let onClose: () => void;

    function removeFromCart(id: number) {
        cart = cart.filter((item) => item.id !== id);
    }
</script>

<div
    class="relative w-full h-full flex flex-col justify-center gap-4 max-w-lg p-2 bg-base-100 rounded-xl"
>
    <div class="w-full flex justify-between items-center">
        <h1 class="badge badge-warning badge-lg badge-soft font-bold">
            🛒 Mon panier
        </h1>
        <p class="badge badge-soft bottom-2 badge-error font-bold text-right">
            Total Panier : {totalPrice} FCFA
        </p>
    </div>
    <div class="flex flex-col gap-2">
        {#each cart as item}
            <div class="flex gap-3 border border-base-300 p-2 rounded-xl">
                <img src={item.image} alt="" class="w-11 h-11 rounded-lg" />
                <div class="flex-1">
                    <p class="font-semibold text-sm text-base-content">
                        {item.name}
                    </p>
                    <p class="badge badge-accent badge-soft">
                        {item.price} FCFA
                    </p>
                </div>
            </div>
        {/each}
    </div>
</div>
