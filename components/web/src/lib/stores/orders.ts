import { writable } from "svelte/store";

export interface Order {
  id: string;
  items: string[];
  timestamp: Date;
  status: "new" | "preparing" | "ready" | "completed";
}

function createOrderStore() {
  const { subscribe, update, set } = writable<Order[]>([]);

  return {
    subscribe,

    addOrder(item: string, summary: string) {
      const order: Order = {
        id: `order-${Date.now()}`,
        items: [item, summary],
        timestamp: new Date(),
        status: "new",
      };
      update((orders) => [order, ...orders]);
    },

    updateOrderStatus(orderId: string, status: Order["status"]) {
      update((orders) =>
        orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    },

    completeOrder(orderId: string) {
      update((orders) =>
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "completed" } : order
        )
      );
    },

    clearOrders() {
      set([]);
    },
  };
}

export const orders = createOrderStore();
