<script setup lang="ts">
interface CategoryViewProps {
  icon: any;
  label: string;
  description: string;
}
const { icon, label, description } = defineProps<CategoryViewProps>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-row items-center gap-4">
      <component :is="icon" size="40" class="text-neutral-600" />
      <div class="flex flex-col">
        <div class="text-lg font-semibold">
          {{ label }}
        </div>
        <div class="text-neutral-500 font-light">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>
