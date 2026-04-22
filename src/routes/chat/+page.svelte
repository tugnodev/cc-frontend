<script lang="ts">
    import { ArrowLeft } from "lucide-svelte";
    import { goto } from "$app/navigation";
    import { chatStore } from "$lib/store/chat.svelte";

    let filter = $state<"all" | "unread">("all");

    const sortedDiscussions = $derived(
        [...chatStore.discussions].sort((a, b) => {
            const lastMsgA = a.messages[a.messages.length - 1];
            const lastMsgB = b.messages[b.messages.length - 1];
            
            const dateA = lastMsgA ? new Date(lastMsgA.createdAt).getTime() : 0;
            const dateB = lastMsgB ? new Date(lastMsgB.createdAt).getTime() : 0;
            
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
            <h1 class="text-2xl font-bold">Messages</h1>
        </div>

        <div class="flex gap-2 mb-3 px-3">
            <button
                class="btn btn-sm rounded-full {filter === 'all' ? 'btn-primary' : 'btn-ghost bg-base-200'}"
                onclick={() => (filter = "all")}>Toutes</button
            >
            <button
                class="btn btn-sm rounded-full {filter === 'unread' ? 'btn-primary' : 'btn-ghost bg-base-200'}"
                onclick={() => (filter = "unread")}>
                Non lues  
                {chatStore.discussions.reduce((acc, d) => acc + d.unreadCount, 0)}
            
            </button>
        </div>
    </div>

    <div class="flex-1 overflow-y-auto no-scrollbar pb-20 p-3">
        {#each filteredDiscussions as d (d.id)}
            {@const lastMessage = d.messages[d.messages.length - 1]}
            <a
                href="/chat/{d.id}"
                class="flex items-center gap-3 p-4 mb-2 rounded-2xl border border-base-300 hover:border-primary/50 transition-all bg-base-100 hover:bg-base-200 shadow-sm"
            >
                <div class="avatar">
                    <div class="w-14 rounded-full bg-neutral text-neutral-content">
                        {#if d.avatar}
                            <img src={d.avatar} alt={d.sender} />
                        {:else}
                            <span class="text-xl">{d.sender[0]}</span>
                        {/if}
                    </div>
                </div>
                
                <div class="flex-1 min-w-0">
                    <div class="flex justify-between items-center mb-1">
                        <span class="font-bold text-base truncate">{d.sender}</span>
                        {#if lastMessage}
                            <span class="text-xs opacity-60">
                                {new Date(lastMessage.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        {/if}
                    </div>
                    
                    <div class="flex justify-between items-center gap-2">
                        <p class="text-sm truncate opacity-70 {d.unreadCount > 0 ? 'font-semibold text-base-content' : ''}">
                            {lastMessage?.message || "Aucun message"}
                        </p>
                        {#if d.unreadCount > 0}
                            <span class="badge badge-primary badge-sm font-bold">{d.unreadCount}</span>
                        {/if}
                    </div>
                </div>
            </a>
        {:else}
            <div class="flex flex-col items-center justify-center mt-20 opacity-40">
                <p>Aucune discussion trouvée.</p>
            </div>
        {/each}
    </div>
</div>