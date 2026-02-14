import { writable } from "svelte/store";
import { type articleDto } from "../services/dtos/article";
import { type cartDto } from "../services/dtos/cart";
import { load } from "@tauri-apps/plugin-store";
import { type StoreIO } from "./store";

export const articles = writable<articleDto[]>([]);
export const searchResults = writable<articleDto[]>([]);
export const panier = writable<cartDto>();
export const userArticles = writable<articleDto[]>([]);

export class ArticlesStore {
  async load(): Promise<articleDto[] | string> {
    const store = await load("articles.json", {
      autoSave: false,
      defaults: {},
    }).catch(() => "error store");

    switch (typeof store) {
      case "string":
        return "error store";
      default:
        const data = await store
          .get("articles")
          .catch(() => "error getting articles");
        return JSON.parse(data as string) as articleDto[];
    }
  }

  async save(data: articleDto[]): Promise<string> {
    const store = await load("articles.json", {
      autoSave: false,
      defaults: {},
    }).catch(() => "error store");

    switch (typeof store) {
      case "string":
        return "error store";
      default:
        await store.set("articles", data);
        await store.save().catch((e) => "failed!");
        return "success!";
    }
  }

  async clear(): Promise<string> {
    const store = await load("articles.json", {
      autoSave: false,
      defaults: {},
    }).catch(() => "error store");

    switch (typeof store) {
      case "string":
        return "error store";
      default:
        await store.delete("articles").catch((e) => "failed!");
        await store.save().catch((e) => "failed!");
        return "success!";
    }
  }
}
