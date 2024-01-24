<script setup lang="ts">
const { icon, label, selected } = defineProps<{
  icon: any;
  label: string;
  selected: boolean;
}>();
const emit = defineEmits(["click"]);
</script>

<template>
  <div
    @click="emit('click', label)"
    :class="`
        rounded-xl
        border-2
        p-4
        flex
        flex-col
        gap-3
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `"
  >
    <component :is="icon" class="w-[30px] h-[30px]" />
    <div class="font-semibold">
      {{ label }}
    </div>
  </div>
</template>
