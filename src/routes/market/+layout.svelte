<script lang="ts">
    import Navbar from "../../components/navbar.svelte";
    import Header from "../../components/header.svelte";
    import { TokenManager } from "$lib/token";
    import "../../app.css";
    import { user as usr } from "$lib/store/users";
    import { BackendFetch } from "$lib/backend";
    import { type cartDto } from "$lib/services/dtos/cart";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { panier } from "$lib/store/articles";

    const load = async () => {
        const tm = new TokenManager();
        const token = await tm.loadToken().then((token) => {
            if (typeof token === "string") {
                return token;
            } else {
                return null;
            }
        });
        const fetch = new BackendFetch(token!);
        const user = await usr.get();
        if (user === null) return;
        user.subscribe(async (user) => {
            const cart = await fetch.get<cartDto>(`/cart/${user?.id}`);
            console.log(cart);
            if (typeof cart === "string") window.location.reload();
            panier.set(cart);
            return;
        });
    };

    load();

    let { children } = $props();
</script>

<main
    class="w-full h-screen items-center justify-start flex flex-col fixed z-0 bg-base-200"
>
    <div class={`flex flex-col absolute z-30 top-0 w-full`}>
        <Header />
    </div>
    <div class="overflow-scroll no-scrollbar w-full h-full">
        {@render children()}
    </div>
    <div class="flex absolute z-20 bottom-14">
        <Navbar />
    </div>
</main>
