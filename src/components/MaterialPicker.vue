<template>
  <div class="w-full">
    <div class="mt-6">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- Add/Selected Box -->
        <button
          type="button"
          class="flex h-40 w-40 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
          @click="open = true"
        >
          <div
            v-if="!selectedMaterial"
            class="flex flex-col items-center gap-2 text-slate-600"
          >
            <div class="text-2xl">＋</div>
            <div class="text-xs font-medium">Add Material</div>
          </div>

          <div v-else class="relative h-full w-full overflow-hidden rounded-xl">
            <img
              :src="selectedMaterial.image"
              :alt="selectedMaterial.name"
              class="h-full w-full object-cover"
            />
            <div class="absolute inset-x-0 bottom-0 bg-black/50 p-2">
              <div class="text-xs font-semibold text-white line-clamp-1">
                {{ selectedMaterial.name }}
              </div>
              <div class="mt-1 flex items-center justify-between">
                <span class="text-[10px] text-white/80">{{
                  selectedMaterial.tag
                }}</span>
                <span
                  class="rounded bg-white/15 px-2 py-0.5 text-[10px] text-white"
                >
                  {{ selectedMaterial.code }}
                </span>
              </div>
            </div>
          </div>
        </button>

        <div
          class="min-h-[420px] rounded-xl border border-slate-100 bg-white p-6"
        >
          <div class="text-xs font-semibold text-slate-700">Preview</div>

          <div v-if="!selectedMaterial" class="mt-6 text-sm text-slate-500">
            No material selected yet. Click “Add Material”.
          </div>

          <div v-else class="mt-4">
            <img
              :src="selectedMaterial.image"
              :alt="selectedMaterial.name"
              class="h-56 w-56 rounded-xl object-cover"
            />
            <div class="mt-3 text-sm font-semibold text-slate-900">
              {{ selectedMaterial.name }}
            </div>
            <div class="mt-1 text-sm text-slate-600">
              {{ selectedMaterial.tag }} · {{ selectedMaterial.code }}
            </div>

            <button
              type="button"
              class="mt-4 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
              @click="clear"
            >
              Remove selection
            </button>
          </div>
        </div>
      </div>
    </div>

    <MaterialModal
      :open="open"
      :categories="categories"
      :tags-by-category="tagsByCategory"
      :materials="materials"
      :selected-id="selectedId"
      @close="open = false"
      @insert="commit"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import MaterialModal from "./MaterialModal.vue";

const props = defineProps({
  categories: { type: Array, required: true },
  tagsByCategory: { type: Object, required: true },
  materials: { type: Array, required: true },
});

const open = ref(false);
const selectedId = ref(null);

const selectedMaterial = computed(() => {
  if (!selectedId.value) return null;
  return props.materials.find((m) => m.id === selectedId.value) || null;
});

function commit(id) {
  selectedId.value = id;
}

function clear() {
  selectedId.value = null;
}
</script>
