<script lang="ts">
    import { goto } from "$app/navigation";
    import { BackendFetch } from "$lib/backend";
    import type { userDto } from "$lib/services/dtos/user";
    import { user } from "$lib/store/users";
    import { TokenManager } from "$lib/token";
    import Main from "../components/Main.svelte";
    import Spinner from "../components/Spinner.svelte";

    const load = async () => {
        const tm = new TokenManager();
        const token = (await tm.loadToken()) as string;
        switch (!token) {
            case true:
                goto("/auth/login");
                break;
            case false:
                if (typeof token === "string") {
                    const fetch = new BackendFetch(token);
                    const session = await fetch.get<userDto>("/session");
                    switch (typeof session) {
                        case "string":
                            goto("/auth/login");
                            break;
                        case "object":
                            if (session.message) {
                                goto("/auth/login");
                            }
                            user.set(session);
                            goto("/market");
                            break;
                        default:
                            window.location.reload();
                            break;
                    }
                }
                break;
        }
    };

    load();
</script>

<Main>
    <section
        class="flex flex-col w-full h-full gap-1 justify-center items-center"
    >
        <div class="w-1/2">
            <img src="/favicon.svg" alt="logo" />
        </div>
        <Spinner size={64} />
    </section>
</Main>
