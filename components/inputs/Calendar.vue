<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { type Range } from "~/types";

interface DatePickerProps {
  range: Range;
  disabledDates?: Date[];
}

const { range, disabledDates } = defineProps<DatePickerProps>();
const emit = defineEmits(["onChange"]);

const localDateRange = ref<Date[]>([]);

if (range.startDate) localDateRange.value[0] = range.startDate;
if (range.endDate) localDateRange.value[1] = range.endDate;

const onRangeChange = async () => {
  await nextTick;
  emit("onChange", {
    startDate: localDateRange.value[0],
    endDate: localDateRange.value[1],
  });
};
</script>

<template>
  <VueDatePicker
    v-model="localDateRange"
    :disabled-dates="disabledDates"
    @range-end="onRangeChange"
    range
    inline
    auto-apply
    :enable-time-picker="false"
    :min-date="new Date()"
  />
</template>
