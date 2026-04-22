<script lang="ts">
    import { page } from "$app/state";
    import { chatStore } from "$lib/store/chat.svelte";
    import { ArrowLeft, SendHorizontal } from "lucide-svelte";
    import { socket } from "$lib/Socket";
    import { onMount } from "svelte";

    const slugId = $derived(page.params.slug ?? "");
    let currentUserAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Moi"; 
    
    const currentDiscussion = $derived(
        chatStore.discussions.find((d) => d.id === slugId)
    );

    let newMessageText = $state("");

    onMount(() => {
        let unlisten: (() => void) | undefined;
        const setupSocket = async () => {
            await socket.connect();
            if (!slugId) return;
            const unsubscribe = await socket.addListener((msg) => {
                try {
                    const data = JSON.parse(msg.data as string);
                    if (data.type === "chat" && data.roomId === slugId) {
                        chatStore.receiveMessage(slugId, data.message);
                    }
                } catch (e) {
                    console.error("Erreur parsing message:", e);
                }
            });
            
            unlisten = unsubscribe;
        };
        
        setupSocket();
        return () => {
            if (unlisten) unlisten();
        };
    });
    $effect(() => {
        if (slugId) {
            chatStore.markAsRead(slugId);
        }
    });

    function handleSend() {
        if (!newMessageText.trim() || !slugId) return;
        chatStore.sendMessage(slugId, newMessageText);
        newMessageText = "";
    }
</script>

{#if currentDiscussion}
    <div class="flex flex-col h-full max-w-2xl mx-auto">
        <div class="flex items-center gap-4 p-4 bg-base-300/60 sticky top-0 z-10">
            <a href="/chat" class="btn btn-ghost btn-circle">
                <ArrowLeft size={30} strokeWidth={2.5} />
            </a>
            <div class="avatar">
                <div class="w-10 rounded-full bg-neutral text-neutral-content">
                    {#if currentDiscussion.avatar}
                        <img src={currentDiscussion.avatar} alt={currentDiscussion.sender} />
                    {:else}
                        <span class="text-xl">{currentDiscussion.sender[0]}</span>
                    {/if}
                </div>
            </div>
            <h2 class="font-bold text-lg">{currentDiscussion.sender}</h2>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar pb-24">
            {#each currentDiscussion.messages as msg}
                <div class="chat {msg.userId === '1' ? 'chat-end' : 'chat-start'}">
                    <div class="chat-image avatar">
                        <div class="w-10 rounded-full bg-neutral text-neutral-content border border-base-300">
                            {#if msg.userId === '1'}
                                <img src={currentUserAvatar} alt="Moi" />
                            {:else}
                                {#if currentDiscussion.avatar}
                                    <img src={currentDiscussion.avatar} alt={currentDiscussion.sender} />
                                {:else}
                                    <span class="text-xs">{currentDiscussion.sender[0]}</span>
                                {/if}
                            {/if}
                        </div>
                    </div>

                    <div class="chat-bubble {msg.userId === '1' ? 'chat-bubble-primary shadow-md' : 'shadow-sm'}">
                        {msg.message}
                    </div>

                    <div class="chat-footer opacity-50 text-xs mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>
            {/each}
        </div>
          

        <div class="fixed bottom-0 left-0 right-0 p-4 bg-base-100 flex items-center gap-2 max-w-2xl mx-auto">
            <input
                type="text"
                placeholder="Votre message..."
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
