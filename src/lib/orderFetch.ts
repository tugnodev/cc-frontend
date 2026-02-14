import { BackendFetch } from "./backend.js";
import { type orderDto } from "./services/dtos/order.js";
import { orderStore } from "./store/order.js";

const bk = new BackendFetch();

export class Orders {
  private orders: orderDto[] = [];

  constructor() {
    this.orders = [];
  }

  async fetchOrders() {
    try {
      const response = await bk.get<orderDto[]>("/orders");
      this.orders = response.data;
      orderStore.set(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
}
