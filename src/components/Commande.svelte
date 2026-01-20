<script>
    import {
        Check,
        X,
        MessageCircle,
        ChevronDown,
        ShoppingCart,
        Filter,
        CheckCircle,
        Clock,
        XCircle,
    } from "@lucide/svelte";

    const utilisateurId = 1;

    let statutActif = "Toutes";

    let commandes = [
        {
            id: 1,
            clientId: 1,
            clientName: "Moi",
            statut: "En attente",
            date: "2025-12-27",
            articles: ["Article A", "Article B"],
        },
        {
            id: 2,
            clientId: 2,
            clientName: "Alice",
            statut: "Validé",
            date: "2025-12-26",
            articles: ["Article C"],
        },
        {
            id: 3,
            clientId: 3,
            clientName: "Bob",
            statut: "Annulé",
            date: "2025-12-25",
            articles: ["Article D", "Article E"],
        },
        {
            id: 4,
            clientId: 4,
            clientName: "Devprocode",
            statut: "Annulé",
            date: "2026-01-02",
            articles: ["Article F", "Article G"],
        },
        {
            id: 5,
            clientId: 5,
            clientName: "Hackdev",
            statut: "En attente",
            date: "2026-01-03",
            articles: ["Article H", "Article I"],
        },
        {
            id: 6,
            clientId: 6,
            clientName: "Marouane",
            statut: "Annulé",
            date: "2026-01-03",
            articles: ["Article J", "Article K"],
        },
        {
            id: 7,
            clientId: 7,
            clientName: "Tug",
            statut: "Validé",
            date: "2026-01-03",
            articles: ["Article L", "Article M"],
        },
        {
            id: 8,
            clientId: 8,
            clientName: "Bomberkill",
            statut: "En attente",
            date: "2026-12-27",
            articles: ["Article A", "Article B"],
        },
        {
            id: 9,
            clientId: 9,
            clientName: "Angele",
            statut: "Validé",
            date: "2025-12-26",
            articles: ["Article C"],
        },
        {
            id: 10,
            clientId: 10,
            clientName: "Fatou",
            statut: "Annulé",
            date: "2025-12-25",
            articles: ["Article D", "Article E"],
        },
        {
            id: 11,
            clientId: 11,
            clientName: "Adja",
            statut: "Annulé",
            date: "2026-01-02",
            articles: ["Article F", "Article G"],
        },
        {
            id: 12,
            clientId: 12,
            clientName: "Arcel",
            statut: "En attente",
            date: "2026-01-03",
            articles: ["Article H", "Article I"],
        },
        {
            id: 13,
            clientId: 13,
            clientName: "Marouane",
            statut: "Annulé",
            date: "2026-01-03",
            articles: ["Article J", "Article K"],
        },
        {
            id: 14,
            clientId: 14,
            clientName: "Pro",
            statut: "Annulé",
            date: "2026-01-03",
            articles: ["Article J", "Article K"],
        },
    ];

    /**
     * @param {number} id
     * @param {string} nouveauStatut
     */
    function changerStatut(id, nouveauStatut) {
        const commande = commandes.find((c) => c.id === id);
        if (commande) commande.statut = nouveauStatut;
    }

    /**
     * @param {number} clientId
     */
    function contacterClient(clientId) {
        window.location.href = `/discussion/${clientId}`;
    }

    $: commandesFiltrees =
        statutActif === "Toutes"
            ? commandes
            : commandes.filter((c) => c.statut === statutActif);
</script>

<div
    class="w-full flex flex-col items-center justify-start mt-16 mb-24 px-1 transition-all duration-300 ease-in-out"
>
    <!-- TITRE -->
    <h1 class="text-2xl font-bold flex items-center gap-2">
        <ShoppingCart class="w-6 h-6 text-blue-500" />
        Commandes
    </h1>

    <!-- FILTRE -->
    <div class="flex flex-wrap gap-2">
        <button
            class="btn btn-sm flex gap-1"
            class:btn-primary={statutActif === "Toutes"}
            on:click={() => (statutActif = "Toutes")}
        >
            <Filter class="w-4 h-4" /> Toutes
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-success={statutActif === "Validé"}
            on:click={() => (statutActif = "Validé")}
        >
            <CheckCircle class="w-4 h-4" /> Validé
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-warning={statutActif === "En attente"}
            on:click={() => (statutActif = "En attente")}
        >
            <Clock class="w-4 h-4" /> En attente
        </button>

        <button
            class="btn btn-sm flex gap-1"
            class:btn-error={statutActif === "Annulé"}
            on:click={() => (statutActif = "Annulé")}
        >
            <XCircle class="w-4 h-4" /> Annulé
        </button>
    </div>

    <!-- COMMANDES -->
    {#if commandesFiltrees.length === 0}
        <p class="text-center text-gray-500 mt-10">Aucune commande trouvée</p>
    {:else}
        <div class="w-full max-w-3xl space-y-2 mt-6">
            {#each commandesFiltrees as commande}
                <div class="collapse border rounded-box bg-base-100">
                    <input type="checkbox" />

                    <div
                        class="collapse-title text-lg font-semibold flex justify-between items-center"
                    >
                        <span
                            >Commande #{commande.id} – {commande.clientName}</span
                        >
                        <div class="flex items-center gap-2">
                            <span class="badge">{commande.statut}</span>
                            <ChevronDown class="w-5 h-5" />
                        </div>
                    </div>

                    <div class="collapse-content">
                        <p><strong>Date :</strong> {commande.date}</p>

                        <p class="mt-2 font-semibold">Articles :</p>
                        <ul class="list-disc ml-5">
                            {#each commande.articles as article}
                                <li>{article}</li>
                            {/each}
                        </ul>

                        <div class="mt-4 flex gap-2 flex-wrap">
                            <button
                                class="btn btn-success btn-sm flex gap-1"
                                on:click={() =>
                                    changerStatut(commande.id, "Validé")}
                            >
                                <Check class="w-4 h-4" /> Valider
                            </button>

                            <button
                                class="btn btn-error btn-sm flex gap-1"
                                on:click={() =>
                                    changerStatut(commande.id, "Annulé")}
                            >
                                <X class="w-4 h-4" /> Annuler
                            </button>

                            <button
                                class="btn btn-outline btn-sm flex gap-1"
                                on:click={() =>
                                    contacterClient(commande.clientId)}
                            >
                                <MessageCircle class="w-4 h-4" /> Contacter
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
