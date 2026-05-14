<script lang="ts">
  import { orders } from "../stores/orders";
</script>

<div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
  <div class="text-gray-400 text-sm font-semibold mb-2">Total Orders</div>
  <div class="text-3xl font-bold text-white">{$orders.length}</div>
</div>

<div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
  <div class="text-gray-400 text-sm font-semibold mb-2">New Orders</div>
  <div class="text-3xl font-bold text-red-400">
    {$orders.filter((o) => o.status === "new").length}
  </div>
</div>

<div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
  <div class="text-gray-400 text-sm font-semibold mb-2">Preparing</div>
  <div class="text-3xl font-bold text-yellow-400">
    {$orders.filter((o) => o.status === "preparing").length}
  </div>
</div>

<div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
  <div class="text-gray-400 text-sm font-semibold mb-2">Ready</div>
  <div class="text-3xl font-bold text-green-400">
    {$orders.filter((o) => o.status === "ready").length}
  </div>
</div>
