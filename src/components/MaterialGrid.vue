<template>
  <div class="h-full">
    <div
      v-if="items.length === 0"
      class="flex h-[360px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center"
    >
      <div class="text-lg font-semibold text-slate-800">No materials found</div>
      <div class="mt-1 text-sm text-slate-500">
        Try changing category, tags, or search.
      </div>
      <button
        type="button"
        class="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
        @click="$emit('reset')"
      >
        Reset filters
      </button>
    </div>

    <div
      v-else
      class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7"
    >
      <MaterialCard
        v-for="m in items"
        :key="m.id"
        :material="m"
        :selected="m.id === selectedId"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import MaterialCard from "./MaterialCard.vue";

defineProps({
  items: { type: Array, default: () => [] },
  selectedId: { type: String, default: null },
});
defineEmits(["select", "reset"]);
</script>
