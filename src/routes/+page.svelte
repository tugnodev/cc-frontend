<script lang="ts">
    import { goto } from "$app/navigation";
    import { BackendFetch } from "$lib/backend";
    import type { userDto } from "$lib/services/dtos/user";
    import { user } from "$lib/store/users";
    import { TokenManager } from "$lib/token";
    import Main from "../components/Main.svelte";
    import Spinner from "../components/Spinner.svelte";
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
