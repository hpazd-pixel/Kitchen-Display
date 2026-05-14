<script lang="ts">
  import { kitchenSession } from "../stores/kitchenSession";
</script>

<header class="bg-gray-800 border-b border-gray-700">
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-4xl font-bold text-white">🍳 Kitchen Display System</h1>
        <p class="text-gray-400 mt-1">Real-time order monitoring</p>
      </div>
      <div class="text-right flex flex-col items-end gap-3">
        <a
          href="/index.html"
          class="px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
        >
          ← Back to Order Entry
        </a>
        <div>
          <div class="text-sm text-gray-400">Status</div>
          <div
            class={`text-lg font-semibold ${
              $kitchenSession.connected ? "text-green-400" : "text-red-400"
            }`}
          >
            {$kitchenSession.connected ? "🟢 Connected" : "🔴 Disconnected"}
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

