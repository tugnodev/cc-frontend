<script>
    import {
        Check,
        X,
        MessageCircle,
        ChevronDown,
        ShoppingCart,
    } from "@lucide/svelte";

    // ID de l'utilisateur connecté
    const utilisateurId = 1;

    // Liste des commandes
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
            date: "2026-01-2",
            articles: ["Article F", "Article G"],
        },
        {
            id: 5,
            clientId: 5,
            clientName: "Hackdev",
            statut: "En attente",
            date: "2026-01-3",
            articles: ["Article H", "Article I"],
        },
        {
            id: 6,
            clientId: 6,
            clientName: "Marouane",
            statut: "Annulé",
            date: "2026-01-3",
            articles: ["Article J", "Article K"],
        },
        {
            id: 7,
            clientId: 7,
            clientName: "Tug",
            statut: "Validé",
            date: "2026-01-3",
            articles: ["Article L", "Article M"],
        },
        {
            id: 8,
            clientId: 8,
            clientName: " Bomberkill",
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
            date: "2026-01-2",
            articles: ["Article F", "Article G"],
        },
        {
            id: 12,
            clientId: 12,
            clientName: "Arcel",
            statut: "En attente",
            date: "2026-01-3",
            articles: ["Article H", "Article I"],
        },
        {
            id: 13,
            clientId: 13,
            clientName: "Marouane",
            statut: "Annulé",
            date: "2026-01-3",
            articles: ["Article J", "Article K"],
        },
        {
            id: 14,
            clientId: 14,
            clientName: "Pro",
            statut: "Annulé",
            date: "2026-01-3",
            articles: ["Article J", "Article K"],
        },
        {
            id: 7,
            clientId: 7,
            clientName: "Tug",
            statut: "Validé",
            date: "2026-01-3",
            articles: ["Article L", "Article M"],
        },
    ];

    // Changer le statut d'une commande
    /**
     * @param {number} id
     * @param {string} nouveauStatut
     */
    function changerStatut(id, nouveauStatut) {
        const commande = commandes.find((c) => c.id === id);
        if (commande) commande.statut = nouveauStatut;
    }

    // Contacter le client
    /**
     * @param {number} clientId
     */
    function contacterClient(clientId) {
        window.location.href = `/discussion/${clientId}`;
    }
</script>

<div class="space-y-2">
    <h1 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <ShoppingCart class="w-6 h-6 text-blue-500" />
        Commandes
    </h1>
    {#each commandes as commande}
        <div
            class={`collapse border rounded-box mb-2
                 ${commande.clientId === utilisateurId ? "border-blue-400 bg-blue-50" : "border-base-300 bg-base-100"}`}
        >
            <input type="checkbox" />
            <div
                class="collapse-title text-lg font-semibold flex justify-between items-center"
            >
                <span>Commande #{commande.id} - {commande.clientName}</span>
                <div class="flex items-center gap-2">
                    <span class="badge">{commande.statut}</span>
                    <ChevronDown class="w-5 h-5" />
                </div>
            </div>

            <div class="collapse-content">
                <p><strong>Date :</strong> {commande.date}</p>
                <p><strong>Articles :</strong></p>
                <ul class="list-disc ml-5">
                    {#each commande.articles as article}
                        <li>{article}</li>
                    {/each}
                </ul>

                <div class="mt-4 flex gap-2 flex-wrap">
                    <button
                        class="btn btn-success btn-sm flex items-center gap-1"
                        onclick={() => changerStatut(commande.id, "Validé")}
                    >
                        <Check class="w-4 h-4" /> Valider
                    </button>
                    <button
                        class="btn btn-error btn-sm flex items-center gap-1"
                        onclick={() => changerStatut(commande.id, "Annulé")}
                    >
                        <X class="w-4 h-4" /> Annuler
                    </button>
                    <button
                        class="btn btn-outline btn-sm flex items-center gap-1"
                        onclick={() => contacterClient(commande.clientId)}
                    >
                        <MessageCircle class="w-4 h-4" /> Contacter
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>
