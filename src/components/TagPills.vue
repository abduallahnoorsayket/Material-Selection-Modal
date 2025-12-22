<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="t in tags"
      :key="t"
      type="button"
      class="rounded-full border px-3 py-1 text-xs transition"
      :class="
        t === modelValue
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
      "
      @click="$emit('update:modelValue', t)"
    >
      {{ t }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  tags: { type: Array, default: () => [] },
  modelValue: { type: String, default: "All" },
});
defineEmits(["update:modelValue"]);
</script>
