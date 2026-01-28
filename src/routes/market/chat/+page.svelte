<script lang="ts">
    import { ArrowLeft, SendHorizontal } from "@lucide/svelte";

    // Types restants identiques
    type Message = {
        id: number;
        text: string;
        sender: "me" | "them";
        timestamp: Date;
    };

    type Discussion = {
        id: number;
        sender: string;
        avatar: string;
        messages: Message[];
        unreadCount: number;
    };

    // --- ÉTATS SVELTE 5 (RUNES) ---
    
    // On utilise $state pour les données qui changent
    let discussions = $state<Discussion[]>([
        {
            id: 1,
            sender: "Wourry Diallo",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            unreadCount: 2,
            messages: [
                { id: 1, text: "Bonjour, comment allez-vous ?", sender: "them", timestamp: new Date("2026-01-27T10:00:00") },
                { id: 2, text: "Salut, les bouteilles sont dispo ?", sender: "them", timestamp: new Date("2026-01-27T15:30:00") }
            ]
        },
        {
            id: 2,
            sender: "Devprocode ",
            avatar: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
            unreadCount: 0,
            messages: [
                { id: 1, text: "Tu étais l'élu !", sender: "them", timestamp: new Date("2026-01-26T12:45:00") },
                { id: 2, text: "Je te hais !", sender: "them", timestamp: new Date("2026-01-26T12:46:00") },
                { id: 3, text: "Calme-toi, Anakin.", sender: "me", timestamp: new Date("2026-01-26T12:47:00") }
            ]
        },
        {
            id: 3,
            sender: "Seira Dieng",
            avatar: "https://i.pravatar.cc/150?u=seira",
            unreadCount: 5,
            messages: [
                { id: 1, text: "Coucou ! On se voit demain pour le projet ?", sender: "them", timestamp: new Date("2026-01-27T09:10:00") }
            ]
        },
        {
            id: 4,
            sender: "Racine Diop",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            unreadCount: 0,
            messages: [
                { id: 1, text: "Bonjour, comment allez-vous ?", sender: "them", timestamp: new Date("2026-01-27T10:00:00") },
                { id: 2, text: "Salut, les bouteilles sont dispo ?", sender: "them", timestamp: new Date("2026-01-27T15:30:00") }
            ]
        },
        {
            id: 5,
            sender: "Hawa Diallo",
            avatar: "https://i.pravatar.cc/150?u=seira",
            unreadCount: 5,
            messages: [
                { id: 1, text: "Coucou ! On se voit demain pour le projet ?", sender: "them", timestamp: new Date("2026-01-27T09:10:00") }
            ]
        },
        {
            id: 6,
            sender: "Landing Sane",
            avatar: "https://i.pravatar.cc/150?u=seira",
            unreadCount: 0,
            messages: [
                { id: 1, text: "Coucou ! On se voit demain pour le projet ?", sender: "them", timestamp: new Date("2026-01-27T09:10:00") }
            ]
        },
        {
            id: 7,
            sender: "Ebaidy Fall",
            avatar: "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
            unreadCount: 0,
            messages: [
                { id: 1, text: "Bonjour, comment allez-vous ?", sender: "them", timestamp: new Date("2026-01-27T10:00:00") },
                { id: 2, text: "Salut, les bouteilles sont dispo ?", sender: "them", timestamp: new Date("2026-01-27T15:30:00") }
            ]
        }
    ]);

    let currentUser = {
        name: "Moi",
        avatar: "https://i.pravatar.cc/150?u=my_unique_id"
    };

    let selectedId = $state<number | null>(null);
    let newMessageText = $state("");
    let filter = $state<"all" | "unread">("all");

    // --- VALEURS DÉRIVÉES (RUNES) ---
    // Remplace les $: par $derived pour la performance et la clarté

    let currentDiscussion = $derived(discussions.find(d => d.id === selectedId));

    let sortedDiscussions = $derived([...discussions].sort((a, b) => {
        const dateA = a.messages[a.messages.length - 1]?.timestamp.getTime() || 0;
        const dateB = b.messages[b.messages.length - 1]?.timestamp.getTime() || 0;
        return dateB - dateA;
    }));

    let filteredDiscussions = $derived(filter === "unread" 
        ? sortedDiscussions.filter(d => d.unreadCount > 0) 
        : sortedDiscussions);

    // --- FONCTIONS ---

    function selectDiscussion(id: number) {
        selectedId = id;
        // En Svelte 5, on modifie l'état directement si c'est un $state
        const discussion = discussions.find(d => d.id === id);
        if (discussion) {
            discussion.unreadCount = 0;
        }
    }

    function sendMessage() {
        if (!newMessageText.trim() || selectedId === null) return;

        const discussion = discussions.find(d => d.id === selectedId);
        if (discussion) {
            discussion.messages.push({
                id: Date.now(),
                text: newMessageText,
                sender: "me",
                timestamp: new Date()
            });
        }
        newMessageText = "";
    }
</script>

{#if !selectedId}
    <div class="w-full flex flex-col justify-start mt-5 mb-28 px-1 transition-all duration-300 ease-in-out">
        <div class="mt-20"> 
            <h1 class="text-2xl font-bold mb-3">Discussions</h1>
            <div class="flex gap-2 mb-4">
                <button 
                    class="btn btn-sm {filter === 'all' ? 'btn-primary' : ''}" 
                    onclick={() => (filter = "all")}
                >
                    Toutes
                </button>
                <button 
                    class="btn btn-sm {filter === 'unread' ? 'btn-primary' : ''}" 
                    onclick={() => (filter = "unread")}
                >
                    Non lues
                </button>
            </div>

            {#each filteredDiscussions as d (d.id)}
                <div 
                    onclick={() => selectDiscussion(d.id)} 
                    class="flex items-center gap-3 p-4 mb-2 rounded-xl border cursor-pointer hover:bg-base-200 transition bg-base-100"
                >
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <img src={d.avatar} alt={d.sender} />
                        </div>
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-center">
                            <span class="font-bold truncate">{d.sender}</span>
                            <span class="text-xs opacity-60 ml-2 whitespace-nowrap">
                                {d.messages[d.messages.length - 1]?.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                        <p class="text-sm truncate opacity-80">
                            {d.messages[d.messages.length - 1]?.text || "Pas de message"}
                        </p>
                    </div>

                    {#if d.unreadCount > 0}
                        <span class="badge badge-primary ml-2">{d.unreadCount}</span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
{:else}
    <div class="flex flex-col mt-15 h-[89vh]">
        <div class="flex flex-col mt-0 bg-primary/99 text-black/90 rounded-t-box">
            <div class="w-full flex items-center gap-4 justify-start mt-5 mb-4 px-4">
                <button 
                    class="btn btn-ghost btn-circle btn-sm" 
                    onclick={() => selectedId = null}
                    aria-label="Retour"
                >
                    <ArrowLeft size={30} strokeWidth={2.5} />
                </button>
                
                <div class="flex items-center gap-3">
                    <div class="avatar">
                        <div class="w-10 rounded-full">
                            <img src={currentDiscussion?.avatar} alt={currentDiscussion?.sender} />
                        </div>
                    </div>
                    <h2 class="font-bold text-lg">{currentDiscussion?.sender}</h2>
                </div>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4 bg-base-200 no-scrollbar">
            {#if currentDiscussion}
                {#each currentDiscussion.messages as msg}
                    <div class="chat {msg.sender === 'me' ? 'chat-end' : 'chat-start'} p-2">
                        <div class="chat-image avatar">
                            <div class="w-8 rounded-full">
                                <img src={msg.sender === 'me' ? currentUser.avatar : currentDiscussion.avatar} alt="" />
                            </div>
                        </div>
                        
                        <div class="chat-bubble {msg.sender === 'me' ? 'chat-bubble-primary' : ''}">
                            {msg.text}
                        </div>

                        <div class="chat-footer opacity-50 text-xs p-1">
                            {msg.sender === 'me' ? 'Envoyé' : 'Reçu'} à {msg.timestamp.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

        <div class="p-4 bg-base-100 flex gap-2">
            <input 
                type="text" 
                placeholder="Écrivez votre message..." 
                class="input input-bordered flex-1 rounded-full" 
                bind:value={newMessageText}
                onkeydown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
                class="btn btn-primary btn-circle" 
                onclick={sendMessage}
            >
                <SendHorizontal size={20} />
            </button>
        </div>
    </div>
{/if}

