<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<div
    class="join fixed bottom-[100px] left-1/2 -translate-x-1/2 z-50
         bg-base-300/50 border-2 border-base-300 text-neutral-content shadow-xl rounded-full"
>
    <button
        class="btn rounded-3xl join-item gap-2"
        on:click={() => dispatch("sort")}
    >
        Trier
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 5L12 19M12 5L16 9M12 5L8 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M12 19L12 5M12 19L16 15M12 19L8 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </button>

    <button
        class="btn rounded-3xl join-item gap-2"
        on:click={() => dispatch("filter")}
    >
        Filtres
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
            <path
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    </button>
</div>
