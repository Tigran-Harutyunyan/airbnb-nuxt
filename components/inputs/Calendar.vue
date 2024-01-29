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
<style>
.dp__menu {
  border: none !important;
}

.dp__outer_menu_wrap {
  margin: 0 auto !important;
}

.dp__today,
.dp__range_end,
.dp__range_start {
  border: 1px solid black !important;
  background: black !important;
  color: white;
}

.dp__calendar_row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
}

.dp__cell_inner {
  border-radius: 0 !important;
}
</style>
