<script>
    import { ArrowRight } from "@lucide/svelte";
    import ModalBox from "./ModalBox.svelte";
    import { goto } from "$app/navigation";

    let modal = $state(false);
</script>

<header
    class="w-full h-16 bg-base-100/50 backdrop-blur-sm flex items-center justify-between p-2"
>
    <div>
        <span class="flex items-center justify-center w-20">
            <a href="/market">
                <img class="w-full h-full" src="/favicon.svg" alt="" />
            </a>
        </span>
    </div>
    <div>
        <span>
            <button class="btn btn-ghost" onclick={() => goto("/market")}>
                <ArrowRight size="32" />
            </button>
        </span>
    </div>
</header>
