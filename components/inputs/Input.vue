<template>
  <div class="w-full relative">
    <DollarIcon
      v-if="formatPrice"
      class="text-neutral-700 absolute top-5 left-2 w-6 h-6"
    />
    <input
      :id="id"
      v-model="modelValue"
      :disabled="disabled"
      :type="type"
      :class="`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-[1px]
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${formatPrice ? 'pl-9' : 'pl-4'}
          ${
            error
              ? 'border-rose-500 focus:border-rose-500'
              : 'border-neutral-300 focus:border-black'
          } 
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
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${formatPrice ? 'left-9' : 'left-4'}
          ${error ? 'text-rose-500' : 'text-zinc-400'}
        `"
    >
      {{ label }}
    </label>
  </div>
</template>
<script setup lang="ts">
import DollarIcon from "~/components/ui/icons/DollarIcon.vue";
const modelValue = defineModel();

const {
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  error,
} = defineProps<{
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  error: string | undefined;
}>();
</script>
