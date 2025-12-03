<script>
    import { ShoppingBag } from "@lucide/svelte";
</script>

<header
    class="w-full h-16 bg-base-100/50 backdrop-blur-sm border-b border-base-300 flex items-center justify-between p-2"
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
            <button class="btn btn-ghost">
                <ShoppingBag size="32" />
            </button>
        </span>
    </div>
</header>
