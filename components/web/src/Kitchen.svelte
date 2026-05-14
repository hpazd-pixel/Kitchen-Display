<script lang="ts">
  import { orders } from "./lib/stores/orders";
  import KitchenHeader from "./lib/components/KitchenHeader.svelte";
  import KitchenOrders from "./lib/components/KitchenOrders.svelte";
  import KitchenStats from "./lib/components/KitchenStats.svelte";
</script>

<div class="min-h-screen bg-gray-900 text-white">
  <KitchenHeader />
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      <KitchenStats />
    </div>
    <KitchenOrders />
  </div>
</div>
