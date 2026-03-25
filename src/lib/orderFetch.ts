import { BackendFetch } from "./backend.js";
import { type orderDto } from "./services/dtos/order.js";
import { orders } from "./store/order.js";

export class Orders {
  bk: BackendFetch;
  constructor() {
    this.bk = new BackendFetch();
  }

  async fetchOrders() {
    try {
      const response = await this.bk.get<orderDto[]>("/orders");
      orders.set(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
}
