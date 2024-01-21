<script setup lang="ts">
const { title, subtitle, center } = defineProps<{
  title: string;
  subtitle?: string;
  center?: boolean;
}>();
</script>

<template>
  <div :class="center ? 'text-center' : 'text-start'">
    <div class="text-2xl font-bold">
      {{ title }}
    </div>
    <div class="font-light text-neutral-500 mt-2">
      {{ subtitle }}
    </div>
  </div>
</template>
