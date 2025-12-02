<script>
    import { Pencil, AtSign, CardSim } from "@lucide/svelte";
</script>

<section class="flex flex-col items-center justify-center w-full gap-8">
    <div
        class="flex flex-col items-center gap-2 justify-center indicator w-40 rounded-full bg-white mt-8"
    >
        <div
            class="indicator-item indicator-bottom bg-base-100 border border-base-300 p-2 rounded-full"
        >
            <Pencil size={28} />
        </div>
        <img class="rounded-full" src="/profile.png" alt="" />
    </div>
    <div class="flex flex-col items-center gap-1">
        <div class="flex items-center">
            <h2 class="font-semibold text-xl">Racine DIOP</h2>
            <div class="badge badge-soft badge-success badge-sm">vendeur</div>
        </div>
        <h2 class="text-xs font-semibold flex items-center gap-1">
            <AtSign size={16} /> mailofracine1@gmail.com
        </h2>
        <h2 class="text-xs font-semibold flex items-center gap-1">
            <CardSim size={16} /> 78 475 45 28
        </h2>
    </div>
</section>
