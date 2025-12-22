<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="t in tags"
      :key="t"
      type="button"
      class="h-9 rounded-lg px-3 text-sm transition"
      :class="
        t === modelValue
          ? 'bg-blue-50 text-blue-700'
          : 'bg-white text-slate-600 hover:bg-slate-50'
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
