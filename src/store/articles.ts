import { writable } from "svelte/store";
import { type articleDto } from "../services/dtos/article";

export const articles = writable<articleDto[]>([]);

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
