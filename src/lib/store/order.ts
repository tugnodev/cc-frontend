import { writable } from "svelte/store";
import type { Order } from "$lib/services/dtos/order";

export const orders = writable<Order[]>([]);
