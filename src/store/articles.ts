import { writable } from "svelte/store";
import { type articleDto } from "../services/dtos/article";

export const articles = writable<articleDto[]>([{

    id: "art-001",
        userId: "user-123",
        title: "MacBook Pro M3",
        images: [ 
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
        ],
        category: ["Informatique", "Électroménager"],
        description: "Ordinateur ultra puissant pour les professionnels du montage et du code.",
        price: 2499,
        stock: 15,
        rates: 1240,
        createdAt: new Date("2024-01-15T10:00:00"),
        updatedAt: new Date("2024-01-20T14:30:00")
    },
    {
        id: "art-002",
        userId: "user-456",
        title: "Nike Air Jordan 1",
        images: [ 
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
        ],
        category: ["Mode", "Sport"],
        description: "Baskets iconiques en édition limitée, confortables et stylées.",
        price: 180,
        stock: 5,
        rates: 850,
        createdAt: new Date("2024-02-01T08:00:00"),
        updatedAt: new Date("2024-02-01T08:00:00")
    },
    {
        id: "art-003",
        userId: "user-123",
        title: "PlayStation 5",
        images: [ 
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
        ],
        category: ["Jeux vidéos & consoles"],
        description: "Console de nouvelle génération avec retour haptique et SSD ultra-rapide.",
        price: 499,
        stock: 0,
        rates: 3200,
        createdAt: new Date("2023-12-10T12:00:00"),
        updatedAt: new Date("2024-01-05T09:15:00")
    },
    {
        id: "art-004",
        userId: "user-123",
        title: "PlayStation 5",
        images: [ 
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
            "/profile.png",
        ],
        category: ["Jeux vidéos & consoles"],
        description: "Console de nouvelle génération avec retour haptique et SSD ultra-rapide.",
        price: 2000,
        stock: 0,
        rates: 3200,
        createdAt: new Date("2023-12-10T12:00:00"),
        updatedAt: new Date("2024-01-05T09:15:00")
}
]); 

  export const addArticle = (article: articleDto) => {
    articles.update((articles) => [...articles, article]);
  };

  export const removeArticle = (id: string) => {
    articles.update((articles) =>
      articles.filter((article) => article.id !== id),
    );
  };

  export const updateArticle = (id: string, updatedArticle: articleDto) => {
    articles.update((articles) => {
      const index = articles.findIndex((article) => article.id === id);
      if (index !== -1) {
        return [
          ...articles.slice(0, index),
          updatedArticle,
          ...articles.slice(index + 1),
        ];
      }
      return articles;
    });
  };

  export const clearArticles = () => {
    articles.set([]);
  };

