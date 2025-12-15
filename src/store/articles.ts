import { writable } from "svelte/store";
import { type articleDto } from "../services/dtos/article";

export const articles = writable<articleDto[]>([]);
