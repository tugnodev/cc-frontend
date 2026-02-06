import { writable } from "svelte/store";
import { type articleDto } from "../services/dtos/article";
import { type cartDto } from "../services/dtos/cart";

export const articles = writable<articleDto[]>([]);
export const searchResults = writable<articleDto[]>([]);
export const panier = writable<cartDto>();
export const userArticles = writable<articleDto[]>([]);
