<script lang="ts">
    import { RefreshCcwIcon } from "@lucide/svelte";
    import "../app.css";
    import { TokenManager } from "$lib/token";
    import { goto } from "$app/navigation";
    import { BackendFetch } from "$lib/backend";
    import { user } from "$lib/store/users";
    import { onMount } from "svelte";
    import { type userDto } from "$lib/services/dtos/user";
    import { page } from "$app/state";

    let { children } = $props();

    const load = async () => {
        const tm = new TokenManager();
        const token = await tm.loadToken();
        switch (!token) {
            case true:
                goto("/auth/login");
                break;
            case false:
                if (typeof token === "string") {
                    console.log(token);
                    const fetch = new BackendFetch(token);
                    const session = await fetch.get<userDto>("/session");
                    console.log(JSON.stringify(session));
                    switch (typeof session) {
                        case "string":
                            goto("/auth/login");
                            break;
                        case "object":
                            if (session.message) {
                                goto("/auth/login");
                            }
                            user.set(session);

                            if (page.url.pathname === "/") goto("/market");
                            break;
                        default:
                            window.location.reload();
                            break;
                    }
                }
                break;
        }
    };

    onMount(async () => {
        await load();
    });
</script>

<main class="w-full fixed mt-8 h-screen overflow-hidden bg-base-200">
    <div class="absolute z-60 bottom-14 left-1">
        <button
            class="btn btn-lg btn-soft btn-error btn-square rounded-full p-2"
            onclick={() => window.location.reload()}
        >
            <RefreshCcwIcon />
        </button>
    </div>
    {@render children()}
</main>
