<script setup lang="ts">
import { Select } from "ant-design-vue";
import type { SelectProps } from "ant-design-vue";

import { useCountries } from "~/composables/useCountries";

const emit = defineEmits(["change"]);

const { getAll } = useCountries();

const options = ref<SelectProps["options"]>(getAll());

const selectedLocation = ref();

const onChange = () => {
  const filtered = options.value?.find(
    (item) => item.value === selectedLocation.value
  );
  emit("change", filtered);
};
</script>

<template>
  <Select
    v-model:value="selectedLocation"
    style="width: 100%"
    placeholder="Select a country"
    :options="options"
    @change="onChange"
  >
    <template #option="{ value: val, label, flag }">
      <span role="img" :aria-label="val">{{ flag }}</span>
      &nbsp;&nbsp;{{ label }}
    </template>
  </Select>
</template>
