<template>
  <div class="w-full relative">
    <!-- <BiDollar
      v-if="formatPrice"
      size="24"
      class="text-neutral-700 absolute top-5 left-2"
    /> -->
    <input
      :id="id"
      v-model="modelValue"
      :disabled="disabled"
      placeholder=" "
      :type="type"
      :class="`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
          ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
        `"
    />
    <label
      :class="`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
        `"
    >
      {{ label }}
    </label>
  </div>
</template>
<script setup lang="ts">
const modelValue = defineModel();
const {
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  errors,
} = defineProps<{
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  errors: any[];
}>();
</script>
