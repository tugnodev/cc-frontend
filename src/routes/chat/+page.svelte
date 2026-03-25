<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    import { goto } from "$app/navigation";
    import { chatStore } from "$lib/store/chat.svelte";

    let filter = $state<"all" | "unread">("all");

    const sortedDiscussions = $derived(
        [...chatStore.discussions].sort((a, b) => {
            const dateA =
                a.messages[a.messages.length - 1]?.timestamp.getTime() || 0;
            const dateB =
                b.messages[b.messages.length - 1]?.timestamp.getTime() || 0;
            return dateB - dateA;
        }),
    );

    const filteredDiscussions = $derived(
        filter === "unread"
            ? sortedDiscussions.filter((d) => d.unreadCount > 0)
            : sortedDiscussions,
    );
</script>

<div class="flex flex-col h-full max-w-2xl mx-auto">
    <div class="mt-0 flex flex-col gap-1">
        <div class="flex gap-5 p-2 items-center">
            <button
                class="btn btn-ghost btn-circle"
                onclick={() => goto("/market/profile")}
            >
                <ArrowLeft size={35} strokeWidth={2.5} />
            </button>
            <h1 class="text-2xl font-bold">Discussions</h1>
        </div>

        <div class="flex gap-2 mb-3 px-3">
            <button
                class="btn btn-sm {filter === 'all' ? 'btn-primary' : ''}"
                onclick={() => (filter = "all")}>Toutes</button
            >
            <button
                class="btn btn-sm {filter === 'unread' ? 'btn-primary' : ''}"
                onclick={() => (filter = "unread")}>Non lues</button
            >
        </div>
    </div>
    <div class="flex-1 overflow-y-auto no-scrollbar pb-20 p-3">
        {#each filteredDiscussions as d (d.id)}
            <a
                href="/chat/{d.id}"
                class="flex items-center gap-3 p-4 mb-2 rounded-xl border hover:bg-base-300 transition bg-base-200"
            >
                <div class="avatar">
                    <div class="w-12 rounded-full">
                        <img src={d.avatar} alt={d.sender} />
                    </div>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center">
                        <span class="font-bold truncate">{d.sender}</span>
                        <span class="text-xs opacity-60">
                            {d.messages[
                                d.messages.length - 1
                            ]?.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                    <p class="text-sm truncate opacity-80">
                        {d.messages[d.messages.length - 1]?.text ||
                            "Pas de message"}
                    </p>
                </div>
                {#if d.unreadCount > 0}
                    <span class="badge badge-primary">{d.unreadCount}</span>
                {/if}
            </a>
        {/each}
    </div>
</div>
