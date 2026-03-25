<script lang="ts">
    import { page } from "$app/state";
    import { ArrowLeft, SendHorizontal } from "lucide-svelte";
    import { chatStore } from "$lib/store/chat.svelte";
    import { onMount } from "svelte";

    // Récupération du slugs (id)
    const slugId = $derived(Number(page.params.slug));
    const currentDiscussion = $derived(
        chatStore.discussions.find((d) => d.id === slugId),
    );

    let newMessageText = $state("");

    let currentUser = {
        name: "Moi",
        avatar: "https://i.pravatar.cc/150?u=my_unique_id",
    };

    // Marquer comme lu quand on ouvre la page
    $effect(() => {
        if (currentDiscussion) {
            chatStore.markAsRead(slugId);
        }
    });

    function handleSend() {
        if (!newMessageText.trim()) return;
        chatStore.sendMessage(slugId, newMessageText);
        newMessageText = "";
    }
</script>

{#if currentDiscussion}
    <div class="flex flex-col h-full max-w-2xl mx-auto">
        <div
            class="flex items-center gap-4 p-4 bg-base-300/60 sticky top-0 z-10"
        >
            <a href="/chat" class="btn btn-ghost btn-circle">
                <ArrowLeft size={30} strokeWidth={2.5} />
            </a>
            <div class="avatar">
                <div class="w-10 rounded-full">
                    <img
                        src={currentDiscussion.avatar}
                        alt={currentDiscussion.sender}
                    />
                </div>
            </div>
            <h2 class="font-bold text-lg">{currentDiscussion.sender}</h2>
        </div>

        <div class="flex-2 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {#each currentDiscussion.messages as msg}
                <div
                    class="chat {msg.sender === 'me'
                        ? 'chat-end'
                        : 'chat-start'}"
                >
                    <div class="chat-image avatar">
                        <div class="w-8 rounded-full">
                            <img
                                src={msg.sender === "me"
                                    ? currentUser.avatar
                                    : currentDiscussion.avatar}
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div
                        class="chat-bubble {msg.sender === 'me'
                            ? 'chat-bubble-primary'
                            : ''}"
                    >
                        {msg.text}
                    </div>
                    <div class="chat-footer opacity-50 text-xs mt-1">
                        {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            {/each}
        </div>

        <div class="p-4 bg-base-100 flex items-center gap-2 mb-12">
            <input
                type="text"
                placeholder=" Message"
                class="input input-bordered flex-1 rounded-full"
                bind:value={newMessageText}
                onkeydown={(e) => e.key === "Enter" && handleSend()}
            />
            <button class="btn btn-primary btn-circle" onclick={handleSend}>
                <SendHorizontal size={25} />
            </button>
        </div>
    </div>
{:else}
    <div class="flex flex-col items-center justify-center h-screen">
        <p>Discussion introuvable.</p>
        <a href="/chat" class="btn btn-link">Retour à la liste</a>
    </div>
{/if}
