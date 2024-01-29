<script setup lang="ts">
import Button from "~/components/Button.vue";
import Calendar from "~/components/inputs/Calendar.vue";
import { type Range } from "~/types";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  disabled?: boolean;
  disabledDates: Date[];
}

const emit = defineEmits(["onChangeDate", "onSubmit"]);

const { price, dateRange, totalPrice, disabled, disabledDates } =
  defineProps<ListingReservationProps>();

const onChangeDate = (data: Range) => {
  emit("onChangeDate", data);
};
</script>

<template>
  <div
    class="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden card p-2"
  >
    <div class="flex flex-row items-center gap-1 p-4">
      <div class="text-2xl font-semibold">$ {{ price }}</div>
      <div class="font-light text-neutral-600 ml-2">night</div>
    </div>
    <hr />
    <Calendar
      class="mx-auto"
      :range="dateRange"
      :disabledDates="disabledDates"
      @onChange="onChangeDate"
    />
    <hr />
    <div class="p-4">
      <Button :disabled="disabled" label="Reserve" @click="emit('onSubmit')" />
    </div>
    <hr />
    <div
      class="p-4 flex flex-row items-center justify-between font-semibold text-lg"
    >
      <div>Total</div>
      <div>$ {{ totalPrice }}</div>
    </div>
  </div>
</template>
<style scoped>
.card {
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
}
</style>
