<script lang="ts">
    type Discussion = {
        id: number;
        sender: string;
        lastMessage: string;
        lastMessageDate: Date;
        unreadCount: number;
    };

    let discussions: Discussion[] = [
        {
            id: 1,
            sender: "Wourry Diallo",
            lastMessage: "Salut, les bouteille son dispo ?",
            lastMessageDate: new Date("2025-12-10T15:30:00"),
            unreadCount: 2,
        },
        {
            id: 2,
            sender: "Racine Diop",
            lastMessage: "Merci beaucoup ",
            lastMessageDate: new Date("2025-01-10T18:20:00"),
            unreadCount: 0,
        },
        {
            id: 3,
            sender: "Seira Dieng",
            lastMessage: "On se voit demain",
            lastMessageDate: new Date("2025-01-11T09:10:00"),
            unreadCount: 5,
        },
        {
            id: 4,
            sender: "Ebeidy Fall",
            lastMessage: "Ok c’est noté",
            lastMessageDate: new Date("2025-01-09T22:45:00"),
            unreadCount: 0,
        },
        {
            id: 5,
            sender: "Abdoulaye Sow",
            lastMessage: "Les foulard c'est a combien",
            lastMessageDate: new Date("2025-01-09T22:45:00"),
            unreadCount: 0,
        },
        {
            id: 6,
            sender: "Fatou Ndiaye",
            lastMessage: "La machine est t'elle de bonne qualite",
            lastMessageDate: new Date("2025-12-11T08:15:00"),
            unreadCount: 3,
        },
        {
            id: 7,
            sender: "Mamadou Ba",
            lastMessage: "J’ai envoyé l'argent",
            lastMessageDate: new Date("2025-12-10T20:30:00"),
            unreadCount: 0,
        },
        {
            id: 8,
            sender: "Awa Thiam",
            lastMessage: "Demain il faut venir avec ma commende",
            lastMessageDate: new Date("2025-12-11T09:45:00"),
            unreadCount: 1,
        },
        {
            id: 9,
            sender: "Oumou Diallo",
            lastMessage: "je suis de Bambey !",
            lastMessageDate: new Date("2025-12-11T09:45:00"),
            unreadCount: 7,
        }
    ];

    /*  ici c'est le filtre des discussions */
    let filter: "all" | "unread" = "all";

    /*  ici c'est pour trier les messages */
    $: sortedDiscussions = [...discussions].sort((a, b) => {
    //  si on est sur Toutes on tri uniquement par date/heure
    if (filter === "all") {
        return b.lastMessageDate.getTime() - a.lastMessageDate.getTime();
    }

    //  si on est sur Non lues
    if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;

    return b.lastMessageDate.getTime() - a.lastMessageDate.getTime();
});


    /* filtrage fimal */
    $: filteredDiscussions =
        filter === "unread"
            ? sortedDiscussions.filter(d => d.unreadCount > 0)
            : sortedDiscussions;

    function markAsRead(id: number) {
        discussions = discussions.map(d =>
            d.id === id ? { ...d, unreadCount: 0 } : d
        );
    }
</script>

<!-- PAGE -->
<div class="w-full h-full p-4 flex flex-col gap-4 bg-base-200">

    <div class="mt-20"> 
        <h1 class="text-2xl font-bold mb-3">Discussions</h1>

       
    </div>

    <!-- Liste de discussion -->
    <div class="flex flex-col gap-2 overflow-y-auto pb-6">
         <div class="flex gap-2">
            <button
                class="btn btn-sm"
                class:btn-primary={filter === "all"}
                on:click={() => (filter = "all")}
            >
                Toutes
            </button>

            <button
                class="btn btn-sm"
                class:btn-primary={filter === "unread"}
                on:click={() => (filter = "unread")}
            >
                Non lues
            </button>
        </div>
        {#each filteredDiscussions as d (d.id)}
            <div
                on:click={() => markAsRead(d.id)}
                class="flex justify-between items-center p-4 rounded-xl border cursor-pointer transition bg-base-100"
            >
                <div class="flex-1">
                    <div class="flex justify-between items-center">
                        <span class="font-bold">{d.sender}</span>
                        <span class="text-xs opacity-60">
                            {d.lastMessageDate.toLocaleDateString()} ·
                            {d.lastMessageDate.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </span>
                    </div>

                    <p class="text-sm truncate opacity-80">
                        {d.lastMessage}
                    </p>
                </div>

                {#if d.unreadCount > 0}
                    <span class="badge badge-primary ml-3">
                        {d.unreadCount}
                    </span>
                {/if}
            </div>
        {/each}
    </div>
    <div class="mt-12"></div>
</div>

