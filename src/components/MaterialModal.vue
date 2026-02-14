<template>
  <BaseModal
    :open="open"
    aria-label="Select Your Material"
    @close="$emit('close')"
  >
    <div class="relative flex h-full flex-col">
      <!-- Floating close -->
      <button
        type="button"
        class="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
        @click="$emit('close')"
        aria-label="Close"
      >
        ✕
      </button>

      <!-- Header -->
      <div class="px-10 pt-10">
        <div class="text-3xl font-semibold text-slate-900">
          Select Your Material
        </div>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-hidden px-10 pt-6">
        <div class="flex h-full flex-col gap-3">
          <!-- Row 1: categories + search -->
          <div class="flex flex-wrap items-center gap-3">
            <button
              v-for="c in categories"
              :key="c.id"
              type="button"
              class="h-10 rounded-lg border px-5 text-sm transition"
              :class="
                c.id === categoryId
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              "
              @click="categoryId = c.id"
            >
              {{ c.name }}
            </button>

            <div class="ml-auto w-full sm:w-[420px]">
              <SearchInput
                v-model="query"
                placeholder="Search by name or color..."
              />
            </div>
          </div>

          <!-- Row 2: tags-->
          <div class="flex flex-wrap items-center gap-3">
            <TagPills v-model="activeTag" :tags="availableTags" />
          </div>

          <!-- Grid (only scroll area) -->
          <div class="flex-1 min-h-0 overflow-auto pr-2">
            <MaterialGrid
              :items="filteredMaterials"
              :selected-id="tempSelectedId"
              @select="onSelect"
              @reset="resetFilters"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 px-10 pb-8 pt-4">
        <button
          type="button"
          class="h-10 rounded-xl border border-slate-200 bg-white px-6 text-sm hover:bg-slate-50"
          @click="$emit('close')"
        >
          Cancel
        </button>

        <button
          type="button"
          class="h-10 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="!tempSelectedId"
          @click="insert"
        >
          Insert
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import BaseModal from "./BaseModal.vue";
import SearchInput from "./SearchInput.vue";
import TagPills from "./TagPills.vue";
import MaterialGrid from "./MaterialGrid.vue";
import { useMaterialFilters } from "../composables/useMaterialFilters";

const props = defineProps({
  open: { type: Boolean, required: true },
  categories: { type: Array, required: true },
  tagsByCategory: { type: Object, required: true },
  materials: { type: Array, required: true },
  selectedId: { type: String, default: null },
});

const emit = defineEmits(["close", "insert"]);
const allMaterials = computed(() => props.materials);

const {
  categoryId,
  activeTag,
  query,
  availableTags,
  filteredMaterials,
  resetFilters,
} = useMaterialFilters({
  allMaterials,
  tagsByCategory: props.tagsByCategory,
});

const tempSelectedId = ref(props.selectedId);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) tempSelectedId.value = props.selectedId;
  }
);

function onSelect(id) {
  tempSelectedId.value = id;
}

function insert() {
  if (!tempSelectedId.value) return;
  emit("insert", tempSelectedId.value);
  emit("close");
}
</script>
