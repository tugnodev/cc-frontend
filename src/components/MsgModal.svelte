<script lang="ts">
    import { MessageCircle } from "@lucide/svelte";
    type Msg = {
        id: number;
        sender: string;
        preview: string;
        time: string;
    };
    let message: Msg[] = $state([
        {
            id: 1,
            sender: "John Doe",
            preview: "Hello, how are you?",
            time: "10:30 AM",
        },
        {
            id: 2,
            sender: "Jane Smith",
            preview: "Hey, what's up?",
            time: "11:45 AM",
        },
        {
            id: 3,
            sender: "Alice Johnson",
            preview: "Hi, I'm fine!",
            time: "12:00 PM",
        },
        {
            id: 4,
            sender: "Bob Brown",
            preview: "How's the weather?",
            time: "1:15 PM",
        },
        {
            id: 5,
            sender: "Charlie White",
            preview: "What's new?",
            time: "2:30 PM",
        },
        {
            id: 6,
            sender: "David Black",
            preview: "Good morning!",
            time: "3:45 PM",
        },
        {
            id: 7,
            sender: "Eve Green",
            preview: "See you later!",
            time: "4:30 PM",
        },
        {
            id: 8,
            sender: "Frank White",
            preview: "Nice to meet you!",
            time: "5:00 PM",
        },
        {
            id: 9,
            sender: "Grace Brown",
            preview: "Good afternoon!",
            time: "6:15 PM",
        },
        {
            id: 10,
            sender: "Henry Green",
            preview: "Good evening!",
            time: "7:30 PM",
        },
        {
            id: 11,
            sender: "Isabella White",
            preview: "How's the weather?",
            time: "8:45 PM",
        },
        {
            id: 12,
            sender: "Jack Black",
            preview: "What's new?",
            time: "9:30 PM",
        },
    ]);
</script>

<!-- Modal -->
<div class="w-full h-full no-scrollbar overflow-scroll p-4 flex flex-col gap-4">
    <!-- Header -->
    <div class="text-center">
        <h1 class="text-2xl font-bold">Discussions</h1>
        <h2 class="text-lg opacity-70">Nouveaux messages</h2>
    </div>

    <div class="flex-1 no-scrollbar flex flex-col gap-2 pr-1">
        {#each message as msg}
            <div class="bg-base-100 rounded-xl p-3 border border-base-300">
                <div class="flex justify-between items-center">
                    <span class="font-bold">{msg.sender}</span>
                    <span class="text-xs opacity-60">{msg.time}</span>
                </div>
                <p class="text-sm opacity-80 truncate">
                    {msg.preview}
                </p>
            </div>
        {/each}
    </div>

    <!-- Action -->
    <button
        onclick={() => (window.location.href = "/market/chat")}
        class="btn btn-primary w-full flex items-center gap-2"
    >
        <MessageCircle />
        Aller au chat
    </button>
</div>
