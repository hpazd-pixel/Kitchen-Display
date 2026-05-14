<script lang="ts">
  import type { Order } from "../stores/orders";
  import { orders } from "../stores/orders";

  function getStatusColor(status: Order["status"]): string {
    switch (status) {
      case "new":
        return "bg-red-900 border-red-500";
      case "preparing":
        return "bg-yellow-900 border-yellow-500";
      case "ready":
        return "bg-green-900 border-green-500";
      case "completed":
        return "bg-gray-700 border-gray-500";
      default:
        return "bg-gray-800 border-gray-500";
    }
  }

  function getStatusLabel(status: Order["status"]): string {
    switch (status) {
      case "new":
        return "🆕 New Order";
      case "preparing":
        return "👨‍🍳 Preparing";
      case "ready":
        return "✅ Ready";
      case "completed":
        return "✓ Completed";
      default:
        return "Unknown";
    }
  }

  function toggleStatus(orderId: string, currentStatus: Order["status"]) {
    const statuses: Order["status"][] = [
      "new",
      "preparing",
      "ready",
      "completed",
    ];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    orders.updateOrderStatus(orderId, statuses[nextIndex]);
  }
</script>

<div class="space-y-6">
  {#if $orders.length === 0}
    <div
      class="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center text-gray-400"
    >
      <div class="text-4xl mb-2">📭</div>
      <p>No orders yet</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each $orders.filter((o) => o.status !== "completed") as order (order.id)}
        <div
          class={`border-2 rounded-lg p-4 transition-all ${getStatusColor(
            order.status
          )}`}
        >
          <div class="flex items-start justify-between mb-3">
            <div>
              <div class="text-sm text-gray-300 font-semibold">
                {getStatusLabel(order.status)}
              </div>
              <div class="text-xs text-gray-400 mt-1">
                {order.timestamp.toLocaleTimeString()}
              </div>
            </div>
            <button
              on:click={() => toggleStatus(order.id, order.status)}
              class="bg-gray-700 hover:bg-gray-600 rounded px-2 py-1 text-xs font-semibold transition-colors"
            >
              Next →
            </button>
          </div>

          <div class="space-y-1 mb-3">
            {#each order.items as item}
              <div class="text-sm text-gray-50 break-words">{item}</div>
            {/each}
          </div>

          <div class="border-t border-gray-600 pt-2 text-xs text-gray-400">
            Order ID: {order.id}
          </div>
        </div>
      {/each}
    </div>

    {#if $orders.filter((o) => o.status === "completed").length > 0}
      <details>
        <summary class="cursor-pointer text-gray-400 hover:text-gray-300">
          Completed Orders (
          {$orders.filter((o) => o.status === "completed").length})
        </summary>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {#each $orders.filter((o) => o.status === "completed") as order (order.id)}
            <div class="border-2 border-gray-600 bg-gray-800 rounded-lg p-4 opacity-50">
              <div class="text-sm text-gray-400 font-semibold mb-2">
                ✓ Completed
              </div>
              <div class="space-y-1">
                {#each order.items as item}
                  <div class="text-sm text-gray-400">{item}</div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </details>
    {/if}
  {/if}
</div>

