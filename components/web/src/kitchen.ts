import "./app.css";
import Kitchen from "./Kitchen.svelte";
import { mount } from "svelte";
import { orders } from "./lib/stores/orders";
import { kitchenSession } from "./lib/stores/kitchenSession";
import type { ServerEvent } from "./lib/types";

const app = mount(Kitchen, {
  target: document.getElementById("app")!,
});

// Connect to WebSocket to monitor orders in real time
function createKitchenSession() {
  let ws: WebSocket | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

  function handleEvent(event: ServerEvent) {
    // Listen for tool_call events to detect when orders are confirmed
    if (event.type === "tool_call" && event.name === "confirm_order") {
      // Extract order summary from the tool arguments
      const orderSummary =
        (event.args?.orderSummary as string) || JSON.stringify(event.args);
      orders.addOrder("Order", orderSummary);
    }

    // Also listen for tool_result to get confirmation feedback
    if (event.type === "tool_result" && event.name === "confirm_order") {
      // Could log or display additional feedback
      console.log("Order confirmed:", event.result);
    }
  }

  function connect() {
    if (ws?.readyState === WebSocket.OPEN) return;

    try {
      kitchenSession.setStatus("connecting");
      ws = new WebSocket(`ws://${window.location.host}/ws`);

      ws.onopen = () => {
        console.log("Kitchen connected to order stream");
        kitchenSession.setConnected(true);
        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleEvent(data);
        } catch (error) {
          console.error("Failed to parse message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        kitchenSession.setStatus("error");
      };

      ws.onclose = () => {
        console.log("Kitchen disconnected from order stream");
        kitchenSession.setConnected(false);
        // Attempt to reconnect after 3 seconds
        if (!reconnectTimer) {
          reconnectTimer = setTimeout(connect, 3000);
        }
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      kitchenSession.setStatus("error");
    }
  }

  function disconnect() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    if (ws) {
      ws.close();
      ws = null;
    }
  }

  return { connect, disconnect };
}

const kitchenSessionManager = createKitchenSession();
kitchenSessionManager.connect();

// Cleanup on unload
window.addEventListener("beforeunload", () => {
  kitchenSessionManager.disconnect();
});

export default app;
