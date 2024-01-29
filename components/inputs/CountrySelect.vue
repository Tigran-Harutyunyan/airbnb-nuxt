<script setup lang="ts">
const modelValue = defineModel();

import { useCountries } from "~/composables/useCountries";

const emit = defineEmits(["change"]);

const { getAll } = useCountries();

const options = ref(getAll());
</script>

<template>
  <Dropdown
    v-model="modelValue"
    filter
    showClear
    :options="options"
    optionLabel="label"
    placeholder="Select your country"
    class="w-full country-selector"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center">
        {{ slotProps.value.flag }}
        <div class="ml-2">{{ slotProps.value.label }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex items-center">
        {{ slotProps.option.flag }}
        <div class="ml-2">{{ slotProps.option.label }}</div>
      </div>
    </template>
  </Dropdown>
</template>
