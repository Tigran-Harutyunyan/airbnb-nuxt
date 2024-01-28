<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        border-[1px]
        w-full
        ${outline ? 'bg-white' : 'gradient'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'} 
      `"
  >
    <div size="24" class="absolute left-4 top-3 w-6 h-6">
      <slot name="icon" />
    </div>

    {{ label }}
  </button>
</template>
<script setup lang="ts">
const {
  label,
  disabled,
  outline,
  small,
  type = "button",
} = defineProps<{
  label: string;
  type?: "button" | "submit";
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}>();
</script>
<style scoped>
.gradient {
  background-image: linear-gradient(
    to right,
    #e61e4d 0%,
    #e31c5f 50%,
    #d70466 100%
  );
}
</style>
