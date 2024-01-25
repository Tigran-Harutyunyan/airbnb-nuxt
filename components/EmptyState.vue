<script setup lang="ts">
const { title, subtitle, showReset } = defineProps<{
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}>();

const router = useRouter();
</script>

<template>
  <div class="h-[60vh] flex flex-col gap-2 justify-center items-center">
    <Heading
      center
      :title="title || 'No exact matches'"
      :subtitle="subtitle || 'Try changing or removing some of your filters.'"
    />
    <div class="w-48 mt-4">
      <Button
        v-if="showReset"
        outline
        label="Remove all filters"
        @click="router.push('/')"
      />
    </div>
  </div>
</template>
