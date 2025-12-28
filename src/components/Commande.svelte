<script>
    import { Check, X, MessageCircle, ChevronDown } from "@lucide/svelte";

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
