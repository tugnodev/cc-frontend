export type Message = {
    id: number;
    text: string;
    sender: "me" | "them";
    timestamp: Date;
};

export type Discussion = {
    id: number;
    sender: string;
    avatar: string;
    messages: Message[];
    unreadCount: number;
};

// State réactif global
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
            { id: 3, text: "Calme-toi, Anakin.", sender: "me", timestamp: new Date("2026-01-26T12:47:00") }
        ]
    },
    {
        id: 3,
        sender: "Seira Dieng",
        avatar: "https://i.pravatar.cc/150?u=seira",
        unreadCount: 5,
        messages: [
            { id: 1, text: "Coucou ! On se voit demain pour le projet ?", sender: "them", timestamp: new Date("2026-01-27T09:10:00") },
            { id: 2, text: "N'oublie pas les documents.", sender: "them", timestamp: new Date("2026-01-27T09:11:00") }
        ]
    },
    {
        id: 4,
        sender: "Mamadou Ba",
        avatar: "https://i.pravatar.cc/150?u=mamadou",
        unreadCount: 0,
        messages: [
            { id: 1, text: "Le virement a été effectué.", sender: "them", timestamp: new Date("2026-01-25T20:30:00") },
            { id: 2, text: "Bien reçu, merci !", sender: "me", timestamp: new Date("2026-01-25T21:00:00") }
        ]
    },
    {
        id: 5,
        sender: "Fatou Ndiaye",
        avatar: "https://i.pravatar.cc/150?u=fatou",
        unreadCount: 1,
        messages: [
            { id: 1, text: "La machine est-elle de bonne qualité ?", sender: "them", timestamp: new Date("2026-01-28T08:15:00") }
        ]
    },
    {
        id: 6,
        sender: "Abdoulaye Sow",
        avatar: "https://i.pravatar.cc/150?u=abdou",
        unreadCount: 0,
        messages: [
            { id: 1, text: "Les foulards c'est à combien ?", sender: "them", timestamp: new Date("2026-01-24T22:45:00") },
            { id: 2, text: "C'est 5000 FCFA l'unité.", sender: "me", timestamp: new Date("2026-01-24T22:50:00") },
            { id: 3, text: "Ok c'est noté.", sender: "them", timestamp: new Date("2026-01-24T22:55:00") }
        ]
    },
    {
        id: 7,
        sender: "Ebaidy Fall",
        avatar: "https://i.pravatar.cc/150?u=seira",
        unreadCount: 5,
        messages: [
            { id: 1, text: "Coucou ! On se voit demain pour le projet ?", sender: "them", timestamp: new Date("2026-01-27T09:10:00") },
            { id: 2, text: "N'oublie pas les documents.", sender: "them", timestamp: new Date("2026-01-27T09:11:00") },
            { id: 3, text: "Et le café aussi haha", sender: "them", timestamp: new Date("2026-01-27T09:12:00") }
        ]
    },
    {
        id: 8,
        sender: "Racine Diop ",
        avatar: "https://i.pravatar.cc/150?u=mamadou",
        unreadCount: 0,
        messages: [
            { id: 1, text: "Le virement a été effectué.", sender: "them", timestamp: new Date("2026-01-25T20:30:00") },
            { id: 2, text: "Bien reçu, merci !", sender: "me", timestamp: new Date("2026-01-25T21:00:00") }
        ]
    },
    {
        id: 9,
        sender: "Racine Diop ",
        avatar: "https://i.pravatar.cc/150?u=mamadou",
        unreadCount: 0,
        messages: [
            { id: 1, text: "Le virement a été effectué.", sender: "them", timestamp: new Date("2026-01-25T20:30:00") },
            { id: 2, text: "Bien reçu, merci !", sender: "me", timestamp: new Date("2026-01-25T21:00:00") }
        ]
    }
]);

export const chatStore = {
    get discussions() { return discussions; },
    
    sendMessage(discussionId: number, text: string) {
        const d = discussions.find(d => d.id === discussionId);
        if (d) {
            d.messages.push({
                id: Date.now(),
                text,
                sender: "me",
                timestamp: new Date()
            });
        }
    },

    markAsRead(discussionId: number) {
        const d = discussions.find(d => d.id === discussionId);
        if (d) d.unreadCount = 0;
    }
};