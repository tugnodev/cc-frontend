import { writable } from 'svelte/store';
import type { orderDto, createOrderDto } from "../services/dtos/order";


function createOrderStore() {
  const { subscribe, set, update } = writable<orderDto[]>([]);

  return {
    subscribe,

    loadAll: async () => {
      try {
        const res = await fetch("http://localhost:3000/orders");
        if (!res.ok) throw new Error("Erreur chargement commandes");
        const data: orderDto[] = await res.json();
        set(data);
      } catch (err) {
        console.error(err);
      }
    },

    
    createOrder: async (dto: createOrderDto) => {
      try {
        const res = await fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dto),
        });
        if (!res.ok) throw new Error("Erreur création commande");
        const newOrder: orderDto = await res.json();
        update((list) => [...list, newOrder]);
      } catch (err) {
        console.error(err);
      }
    },

    
    updateStatus: async (id: string, status: string) => {
      try {
        const res = await fetch(`http://localhost:3000/orders/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (!res.ok) throw new Error("Erreur mise à jour statut");
        update((list) =>
          list.map((o) => (o.id === id ? { ...o, status } : o))
        );
      } catch (err) {
        console.error(err);
      }
    },

    
    reset: () => set([]),
  };
}

export const orders = createOrderStore();


