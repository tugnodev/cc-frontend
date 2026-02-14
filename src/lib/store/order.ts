import { writable } from "svelte/store";
import type { orderDto } from "$lib/services/dtos/order";

export const orders = writable<orderDto[]>([]);
