<template>
  <div class="relative w-full">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="w-full rounded-lg border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:border-slate-300"
      :placeholder="placeholder"
    />
    <span
      class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
    >
      🔎
    </span>
    <button
      v-if="modelValue"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
      @click="$emit('update:modelValue', '')"
    >
      Clear
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "Search..." },
});
defineEmits(["update:modelValue"]);
</script>
