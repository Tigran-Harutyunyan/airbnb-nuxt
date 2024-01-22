<template>
  <button
    :disabled="disabled"
    :class="`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `"
  >
    <div size="24" class="absolute left-4 top-3 w-6 h-6">
      <slot />
    </div>

    {{ label }}
  </button>
</template>
<script setup lang="ts">
const { label, disabled, outline, small } = defineProps<{
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}>();
</script>
