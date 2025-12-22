<template>
  <div class="relative w-full">
    <span
      class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M21 21l-4.3-4.3m1.8-5.2a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>

    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      class="h-10 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-16 text-sm outline-none placeholder:text-slate-400 focus:border-slate-300"
      :placeholder="placeholder"
    />

    <button
      v-if="modelValue"
      type="button"
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-xs text-slate-600 hover:bg-slate-50"
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
