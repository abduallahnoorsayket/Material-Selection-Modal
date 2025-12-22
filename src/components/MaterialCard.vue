<template>
  <button
    type="button"
    class="group relative rounded-lg border bg-white text-left transition focus:outline-none focus:ring-2 focus:ring-blue-200"
    :class="
      selected
        ? 'border-blue-500 shadow-sm'
        : 'border-slate-200 hover:border-slate-300'
    "
    @click="$emit('select', material.id)"
    :aria-label="material.name"
  >
    <!-- Inner inset wrapper -->
    <div class="p-2">
      <div class="aspect-square w-full overflow-hidden rounded bg-slate-50">
        <img
          :src="material.image"
          :alt="material.name"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Bottom-left code pill -->
    <div class="absolute bottom-3 left-2">
      <span
        class="rounded px-2 py-1 text-[11px] font-medium text-white transition"
        :class="selected ? 'bg-blue-500' : 'bg-black/85'"
      >
        {{ material.code }}
      </span>
    </div>

    <!-- Selected check icon -->
    <div
      v-if="selected"
      class="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 shadow"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" class="h-4 w-4 text-white" fill="currentColor">
        <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
      </svg>
    </div>

    <span class="sr-only">
      {{ material.name }} — {{ material.tag }} — {{ material.code }}
    </span>
  </button>
</template>

<script setup>
defineProps({
  material: { type: Object, required: true },
  selected: { type: Boolean, default: false },
});
defineEmits(["select"]);
</script>
