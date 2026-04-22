import { socket } from "$lib/Socket";

export type Message = {
  id: string;
  roomId: string;
  userId: string;
  message: string;
  articleId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Discussion = {
  id: string;
  sender: string;
  avatar: string;
  messages: Message[];
  unreadCount: number;
};

class ChatStore {
  discussions = $state<Discussion[]>([
  {
    id: "1",
    sender: "Racine Diop",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Racine",
    messages: [
      {
        id: crypto.randomUUID(),
        roomId: "1",
        userId: "2",
        message: "Naka mou ame gua pochette iPhone 13 bi ?",
        articleId: "art_123",
        createdAt: new Date(Date.now() - 3600000 * 2), 
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        roomId: "1",
        userId: "1",
        message: "Waouh, mangui koy diay 5000 f.",
        articleId: null,
        createdAt: new Date(Date.now() - 3600000), 
        updatedAt: new Date(),
      }
    ],
    unreadCount: 0,
  },
  {
    id: "2",
    sender: "Fatou Kiné Sarr",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou",
    messages: [
      {
        id: crypto.randomUUID(),
        roomId: "2",
        userId: "2",
        message: "Est-ce que le livre de calcul intégral est toujours dispo ?",
        articleId: "book_456",
        createdAt: new Date(Date.now() - 1800000), 
        updatedAt: new Date(),
      }
    ],
    unreadCount: 1, 
  },
  {
    id: "3",
    sender: "Moussa NDIAYE",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Moussa",
    messages: [
      {
        id: crypto.randomUUID(),
        roomId: "3",
        userId: "1",
        message: "On se voit devant le resto U à 13h ?",
        articleId: null,
        createdAt: new Date(Date.now() - 900000), 
        updatedAt: new Date(),
      },
      {
        id: crypto.randomUUID(),
        roomId: "3",
        userId: "2",
        message: "D'accord, j'amène l'ordinateur.",
        articleId: null,
        createdAt: new Date(Date.now() - 300000), 
        updatedAt: new Date(),
      }
    ],
    unreadCount: 0,
  },
  {
    id: "4",
    sender: "Ami Collé",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ami",
    messages: [
      {
        id: crypto.randomUUID(),
        roomId: "4",
        userId: "2",
        message: "Ton prix final pour les chaussures c'est combien ?",
        articleId: "shoes_789",
        createdAt: new Date(Date.now() - 60000), 
        updatedAt: new Date(),
      }
    ],
    unreadCount: 1,
  }
]);

  receiveMessage(discussionId: string, text: string) {
    const d = this.discussions.find((d) => d.id === discussionId);
    if (d) {
      d.messages.push({
        id: crypto.randomUUID(),
        roomId: discussionId,
        userId: "2",
        message: text,
        articleId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      d.unreadCount++;
    }
  }

  async sendMessage(discussionId: string, text: string) {
    const d = this.discussions.find((d) => d.id === discussionId);
    if (d) {
      const newMessage: Message = {
        id: crypto.randomUUID(),
        roomId: discussionId,
        userId: "1", 
        message: text,
        articleId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      d.messages.push(newMessage);

      await socket.send(
        JSON.stringify({
          type: "chat",
          roomId: discussionId,
          message: text,
        })
      );
    }
  }

  markAsRead(discussionId: string) {
    const d = this.discussions.find((d) => d.id === discussionId);
    if (d) d.unreadCount = 0;
  }
}

export const chatStore = new ChatStore();