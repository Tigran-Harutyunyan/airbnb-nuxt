<script setup lang="ts">
import { type Range } from "~/types";

interface DatePickerProps {
  range: Range;
  disabledDates?: Date[];
}

const { range, disabledDates } = defineProps<DatePickerProps>();
const emit = defineEmits(["onChange"]);

const localDateRange = ref({
  start: range.startDate,
  end: range.endDate,
});

watch(
  localDateRange,
  () => {
    console.log(localDateRange);
    emit("onChange", {
      startDate: localDateRange.value.start,
      endDate: localDateRange.value.end,
    });
  },
  {
    deep: true,
  }
);
</script>

<template>
  <ClientOnly>
    <VDatePicker
      borderless
      v-model.range="localDateRange"
      :disabled-dates="disabledDates"
      :min-date="new Date()"
      mode="date"
      class="date-picker"
    />
  </ClientOnly>
</template>
<style>
.date-picker {
  width: 100%;
  border: none;
  margin-top: 20px;
}
.vc-header {
  margin-bottom: 10px;
}

.vc-highlight-bg-light {
  background-color: #e5e5e5;
}

.vc-highlight-content-light {
  color: black;
  font-style: normal;
}

.vc-disabled {
  text-decoration: line-through;
}

.vc-highlight-content-solid,
.vc-highlight-content-solid.vc-focus {
  background: #000;
}

.vc-highlight-content-outline {
  border-color: black;
}

.vc-highlight.vc-highlight-bg-outline {
  border-color: black;
  color: black;
}

.vc-day-content.vc-highlight-content-outline {
  color: black;
}
.vc-day-content.vc-highlight-content-outline.vc-focus {
  box-shadow: rgba(134, 141, 152, 0.4) 0px 0px 0px 2px;
}
</style>
<!-- rgba(59, 131, 246, 0.4) 0px 0px 0px 2px -->
