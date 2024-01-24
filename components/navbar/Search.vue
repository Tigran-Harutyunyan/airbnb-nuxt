<script setup lang="ts">
import BiSearchIcon from "~/components/ui/icons/BiSearchIcon.vue";
import { differenceInDays } from "date-fns";
import { useCountries } from "~/composables/useCountries";

const route = useRoute();
const locationValue = ref(route?.query?.locationValue);
const startDate = ref(route?.query?.startDate);
const endDate = ref(route?.query?.endDate);
const guestCount = ref(route?.query?.guestCount);
const { getByValue } = useCountries();

const durationLabel = computed(() => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value as string);
    const end = new Date(endDate.value as string);
    let diff = differenceInDays(end, start);

    if (diff === 0) {
      diff = 1;
    }

    return `${diff} Days`;
  }

  return "Any Week";
});

const guestLabel = computed(() => {
  if (guestCount.value) {
    return `${guestCount} Guests`;
  }

  return "Add Guests";
});

const locationLabel = computed(() => {
  if (locationValue.value) {
    return getByValue(locationValue.value as string)?.label;
  }

  return "Anywhere";
});
</script>

<template>
  <div
    @click="searchModal.onOpen"
    class="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
  >
    <div class="flex flex-row items-center justify-between">
      <div class="text-sm font-semibold px-6">
        {{ locationLabel }}
      </div>
      <div
        class="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center"
      >
        {{ durationLabel }}
      </div>
      <div
        class="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3"
      >
        <div class="hidden sm:block">{{ guestLabel }}</div>
        <div class="p-2 bg-rose-500 rounded-full text-white">
          <BiSearchIcon class="w-[18px]" />
        </div>
      </div>
    </div>
  </div>
</template>
