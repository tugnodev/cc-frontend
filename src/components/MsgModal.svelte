<script lang="ts">
    import { X, MessageCircle } from "@lucide/svelte";

    // props
    export let messages: {
        id: number;
        sender: string;
        preview: string;
        time: string;
    }[] = [
      {
        id: 1,
        sender: "John Doe",
        preview: "Hello, how are you?",
        time: "10:30 AM"
      },
      {
        id: 2,
        sender: "Jane Smith",
        preview: "Hey, what's up?",
        time: "11:45 AM"
      },
      {
        id: 3,
        sender: "Alice Johnson",
        preview: "Hi, I'm fine!",
        time: "12:00 PM"
      },
      {
        id: 4,
        sender: "Bob Brown",
        preview: "How's the weather?",
        time: "1:15 PM"
      },
    ];
    export let onClose: () => void;

</script>

<!-- Overlay -->
<div class="fixed inset-0 bg-black/40 backdrop-blur z-50 flex items-center justify-center">
    <!-- Modal -->
    <div
        class="max-w-96 w-full min-h-96 bg-base-200/90 rounded-2xl border border-base-300 p-4 flex flex-col gap-4 relative"
    >
        <!-- Close -->
        <button
            on:click={onClose}
            class="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost btn-error"
        >
            <X />
        </button>

        <!-- Header -->
        <div class="text-center">
            <h1 class="text-2xl font-bold">Discussions</h1>
            <h2 class="text-lg opacity-70">Nouveaux messages</h2>
        </div>

        <!-- Messages -->
        <div class="flex-1 overflow-y-auto flex flex-col gap-2">
            {#if messages.length === 0}
                <p class="text-center opacity-60 mt-10">
                    Aucun nouveau message
                </p>
            {:else}
                {#each messages as msg}
                    <div
                        class="bg-base-100 rounded-xl p-3 border border-base-300"
                    >
                        <div class="flex justify-between items-center">
                            <span class="font-bold">{msg.sender}</span>
                            <span class="text-xs opacity-60">{msg.time}</span>
                        </div>
                        <p class="text-sm opacity-80 truncate">
                            {msg.preview}
                        </p>
                    </div>
                {/each}
            {/if}
        </div>

        <!-- Action -->
        <button
            on:click={() => {window.location.href = "/chat"}}
            class="btn btn-primary w-full flex items-center gap-2"
        >
            <MessageCircle />
            Aller au chat
        </button>
    </div>
</div>
