import { computed, ref, watch } from "vue";

export function useMaterialFilters({ allMaterials, tagsByCategory }) {
  const categoryId = ref("all");
  const activeTag = ref("All");
  const query = ref("");

  // Debounced query for smoother filtering
  const debouncedQuery = ref("");
  let t = null;

  watch(query, (val) => {
    window.clearTimeout(t);
    t = window.setTimeout(() => {
      debouncedQuery.value = val;
    }, 200);
  });

  const availableTags = computed(() => {
    return tagsByCategory[categoryId.value] || ["All"];
  });

  watch(categoryId, () => {
    const tags = availableTags.value;
    if (!tags.includes(activeTag.value)) {
      activeTag.value = "All";
    }
  });

  const filteredMaterials = computed(() => {
    const q = debouncedQuery.value.trim().toLowerCase();
    return allMaterials.value.filter((m) => {
      const categoryOk =
        categoryId.value === "all" ? true : m.categoryId === categoryId.value;

      const tagOk =
        activeTag.value === "All" ? true : m.tag === activeTag.value;

      const queryOk =
        q.length === 0
          ? true
          : `${m.name} ${m.code} ${m.tag} ${m.categoryId}`
              .toLowerCase()
              .includes(q);

      return categoryOk && tagOk && queryOk;
    });
  });

  function resetFilters() {
    categoryId.value = "all";
    activeTag.value = "All";
    query.value = "";
    debouncedQuery.value = "";
  }

  return {
    categoryId,
    activeTag,
    query,
    availableTags,
    filteredMaterials,
    resetFilters,
  };
}
