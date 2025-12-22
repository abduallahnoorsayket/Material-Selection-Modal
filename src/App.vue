<template>
  <div class="min-h-screen bg-slate-50">
    <div class="mx-auto max-w-6xl px-6 py-10">
      <MaterialPicker
        :categories="categories"
        :tags-by-category="tagsByCategory"
        :materials="materials"
      />
    </div>
  </div>
</template>

<script setup>
import MaterialPicker from "./components/MaterialPicker.vue";
import { categories, tagsByCategory, materials } from "./data/materials";
</script>
