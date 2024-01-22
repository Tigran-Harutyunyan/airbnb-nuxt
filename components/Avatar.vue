<script setup lang="ts">
const { src } = defineProps<{
  src: string | null | undefined;
}>();
</script>

<template>
  <NuxtImg
    class="rounded-full"
    height="30"
    width="30"
    alt="Avatar"
    :src="src || '/images/placeholder.jpg'"
  />
</template>
