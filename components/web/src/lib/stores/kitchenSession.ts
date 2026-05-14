import { writable } from "svelte/store";

export interface KitchenSessionState {
  connected: boolean;
  status: "ready" | "connecting" | "listening" | "error" | "disconnected";
}

function createKitchenSessionStore() {
  const { subscribe, set, update } = writable<KitchenSessionState>({
    connected: false,
    status: "ready",
  });

  return {
    subscribe,

    setConnected(connected: boolean) {
      update((s) => ({
        ...s,
        connected,
        status: connected ? "listening" : "disconnected",
      }));
    },

    setStatus(status: KitchenSessionState["status"]) {
      update((s) => ({ ...s, status }));
    },
  };
}

export const kitchenSession = createKitchenSessionStore();
