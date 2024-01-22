<script setup lang="ts">
const { label } = defineProps<{
  label: string;
}>();
</script>
<template>
  <div class="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
    {{ label }}
  </div>
</template>
