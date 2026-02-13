import { writable } from 'svelte/store';
import { type orderDto } from '../services/dtos/order';  

export const commande = writable<orderDto[]>([]);
