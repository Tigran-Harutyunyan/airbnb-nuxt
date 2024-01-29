<script setup lang="ts">
import qs from "query-string";
import { formatISO } from "date-fns";
import Modal from "~/components/modals/Modal.vue";
import CountrySelect from "~/components/inputs/CountrySelect.vue";
import Heading from "~/components/Heading.vue";
import Counter from "~/components/inputs/Counter.vue";
import Calendar from "~/components/inputs/Calendar.vue";

import { useMainStore } from "~/stores/store";
import type { ILocation, Range } from "~/types/index";

const { isSearchModalOpen } = storeToRefs(useMainStore());
const { setSearchModalOpen } = useMainStore();

const params = useRoute().query;
const router = useRouter();

interface IFormData {
  location?: ILocation | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  dateRange: {
    startDate: Date;
    endDate: Date;
    key: string;
  };
}

const formData = reactive<IFormData>({
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
});

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
const step = ref(STEPS.LOCATION);

const dateRange = ref({
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
});

const onBack = () => {
  step.value--;
};

const onNext = () => {
  step.value++;
};

const actionLabel = computed(() => {
  if (step.value === STEPS.INFO) {
    return "Search";
  }

  return "Next";
});

const secondaryActionLabel = computed(() => {
  if (step.value === STEPS.LOCATION) {
    return undefined;
  }

  return "Back";
});

const nextStepIsDisabled = computed(() => {
  return false;
});

const onSubmit = async () => {
  if (step.value !== STEPS.INFO) {
    return onNext();
  }

  let currentQuery = {};

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery: any = {
    ...currentQuery,
    locationValue: formData.location?.value,
    guestCount: formData.guestCount,
    roomCount: formData.roomCount,
    bathroomCount: formData.bathroomCount,
  };

  if (formData.dateRange.startDate) {
    updatedQuery.startDate = formatISO(formData.dateRange.startDate);
  }

  if (formData.dateRange.endDate) {
    updatedQuery.endDate = formatISO(formData.dateRange.endDate);
  }

  const url = qs.stringifyUrl(
    {
      url: "/",
      query: updatedQuery,
    },
    { skipNull: true }
  );

  step.value = STEPS.LOCATION;
  setSearchModalOpen(false);
  setTimeout(() => {
    router.push(url);
  }, 300);
};

const onChangeDate = (data: Range) => {
  formData.dateRange = JSON.parse(JSON.stringify(data));
};

const onCounterChange = (info: any) => {
  Object.assign(formData, info);
};
</script>

<template>
  <Modal
    :isOpen="isSearchModalOpen"
    title="Filters"
    @close="setSearchModalOpen(false)"
    styles="max-w-[570px]"
  >
    <div class="flex flex-col gap-8" v-show="step === STEPS.LOCATION">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CountrySelect v-model="formData.location" />
      <Map v-if="formData.location" :center="formData.location?.latlng" />
    </div>
    <div class="flex flex-col gap-8" v-show="step === STEPS.DATE">
      <Calendar class="mx-auto" :range="dateRange" @onChange="onChangeDate" />
    </div>

    <div class="flex flex-col gap-8" v-show="step === STEPS.INFO">
      <Counter
        id="guestCount"
        title="Guests"
        subtitle="How many guests are coming?"
        :count="formData.guestCount"
        @change="onCounterChange"
      />
      <hr />
      <Counter
        id="roomCount"
        title="Rooms"
        subtitle="How many rooms do you need?"
        :count="formData.roomCount"
        @change="onCounterChange"
      />
      <hr />
      <Counter
        id="bathroomCount"
        title="Bathrooms"
        subtitle="How many bathrooms do you need?"
        :count="formData.bathroomCount"
        @change="onCounterChange"
      />
    </div>
    <!-- Buttons -->
    <div class="flex flex-col gap-2 pt-6">
      <div class="flex flex-row items-center gap-4 w-full">
        <Button
          v-if="secondaryActionLabel"
          :label="secondaryActionLabel"
          @click="onBack"
          outline
        />
        <Button
          :disabled="nextStepIsDisabled"
          :label="actionLabel"
          type="submit"
          @click="onSubmit"
        />
      </div>
    </div>
  </Modal>
</template>
