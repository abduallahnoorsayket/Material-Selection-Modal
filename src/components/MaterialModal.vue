<template>
  <BaseModal
    :open="open"
    aria-label="Select Your Material"
    @close="$emit('close')"
  >
    <div class="flex h-full flex-col">
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-slate-100 px-6 py-4"
      >
        <div>
          <div class="text-base font-semibold text-slate-900">
            Select Your Material
          </div>
        </div>
        <button
          type="button"
          class="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-50"
          @click="$emit('close')"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-hidden px-6 py-4">
        <div class="flex h-full flex-col gap-4">
          <!-- Category tabs -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="c in categories"
              :key="c.id"
              type="button"
              class="rounded-lg border px-3 py-1.5 text-xs transition"
              :class="
                c.id === categoryId
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              "
              @click="categoryId = c.id"
            >
              {{ c.name }}
            </button>

            <div class="ml-auto w-full sm:w-[320px]">
              <SearchInput
                v-model="query"
                placeholder="Search by name or color..."
              />
            </div>
          </div>

          <!-- Tags row -->
          <div class="flex items-start gap-3">
            <div class="shrink-0 text-xs font-medium text-slate-600">Tags</div>
            <TagPills v-model="activeTag" :tags="availableTags" />
          </div>

          <!-- Grid -->
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
      <div
        class="flex items-center justify-between border-t border-slate-100 px-6 py-4"
      >
        <div class="text-xs text-slate-500">
          <span v-if="tempSelected">Selected:</span>
          <span v-if="tempSelected" class="font-medium text-slate-800">
            {{ tempSelected.name }} ({{ tempSelected.code }})
          </span>
          <span v-else>No selection</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50"
            @click="$emit('close')"
          >
            Cancel
          </button>

          <button
            type="button"
            class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!tempSelectedId"
            @click="insert"
          >
            Insert
          </button>
        </div>
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
  selectedId: { type: String, default: null }, // committed selection
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

// Temporary selection inside modal (user can change without committing)
const tempSelectedId = ref(props.selectedId);

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      tempSelectedId.value = props.selectedId;
    }
  }
);

const tempSelected = computed(
  () => props.materials.find((m) => m.id === tempSelectedId.value) || null
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
