<script setup lang="ts">
import { useCategories } from "~/composables/useCategories";
const route = useRoute();
const categories = useCategories();

const selectedCategory = computed(() => {
  return route?.query?.category;
});
</script>

<template>
  <Container>
    <div
      class="pt-4 flex flex-row items-center justify-between overflow-x-auto"
    >
      <CategoryBox
        v-for="item in categories"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        :selected="selectedCategory === item.label"
      />
    </div>
  </Container>
</template>
