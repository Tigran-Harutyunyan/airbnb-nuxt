<script setup lang="ts">
import Modal from "~/components/modals/Modal.vue";
import Input from "~/components/inputs/Input.vue";
import ImageUpload from "~/components/inputs/ImageUpload.vue";
import CountrySelect from "~/components/inputs/CountrySelect.vue";
import CategoryInput from "~/components/inputs/CategoryInput.vue";
import Counter from "~/components/inputs/Counter.vue";
import Heading from "~/components/Heading.vue";
import { useMainStore } from "~/stores/store";
import { useCategories } from "~/composables/useCategories";
import { type ILocation } from "~/types/index";
import { useToastService } from "~/composables/useToast";

const toastService = useToastService();

const categories = useCategories();

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const step = ref(STEPS.CATEGORY);

const isLoading = ref(false);
const showForm = ref(true);

interface IFormData {
  category: string;
  location: ILocation;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}

const initialForm = ref({
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
});

const formData = reactive<IFormData>(getNewCopy(initialForm.value));

const { setRentModalOpen, setRentCount } = useMainStore();
const { isRentModalOpen } = storeToRefs(useMainStore());

const actionLabel = computed(() => {
  if (step.value === STEPS.PRICE) {
    return "Create";
  }

  return "Next";
});

const secondaryActionLabel = computed(() => {
  if (step.value === STEPS.CATEGORY) {
    return undefined;
  }

  return "Back";
});

const nextStepIsDisabled = computed(() => {
  // Trivial validation
  if (step.value === STEPS.CATEGORY && !formData.category) return true;
  if (step.value === STEPS.LOCATION && !formData.location) return true;
  if (step.value === STEPS.INFO && !formData.location) return true;
  if (step.value === STEPS.IMAGES && !formData.imageSrc) return true;
  if (
    step.value === STEPS.DESCRIPTION &&
    (formData.title.length === 0 || formData.description.length === 0)
  )
    return true;

  return false;
});

const onBack = () => {
  step.value--;
};

const onNext = () => {
  step.value++;
};

const onCategorySelect = (value: string) => {
  Object.assign(formData, { category: value });
};

const onCounterChange = (info: any) => {
  Object.assign(formData, info);
};

const onImageUpload = (img: string) => {
  Object.assign(formData, { imageSrc: img });
};

const resetForm = async () => {
  showForm.value = false;
  Object.assign(formData, getNewCopy(initialForm.value));
  await nextTick();
  showForm.value = true;
  step.value = STEPS.CATEGORY;
};

const onSubmit = async () => {
  if (step.value !== STEPS.PRICE) {
    return onNext();
  }

  try {
    isLoading.value = true;

    await $fetch("/api/listings", {
      method: "post",
      body: formData,
    });

    toastService.add({
      severity: "success",
      summary: "Success",
      detail: "You have successfully added a property",
      life: 4000,
    });

    setRentCount();
    setRentModalOpen(false);
    setTimeout(() => {
      resetForm();
    }, 300);
  } catch (e) {
    toastService.add({
      severity: "error",
      summary: "Property registration error",
      detail: e?.data?.message,
      life: 4000,
    });
  } finally {
    isLoading.value = false;
  }
};
function getNewCopy(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}
</script>
<template>
  <Modal
    :isOpen="isRentModalOpen"
    title="Airbnb your home!"
    @close="setRentModalOpen(false)"
    styles="max-w-[570px]"
  >
    <div v-if="showForm">
      <div class="flex flex-col gap-8" v-show="step === STEPS.CATEGORY">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
        >
          <div :key="item.label" class="col-span-1" v-for="item in categories">
            <CategoryInput
              @click="onCategorySelect"
              :selected="formData.category === item.label"
              :label="item.label"
              :icon="item.icon"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-8" v-show="step === STEPS.LOCATION">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect v-model="formData.location" />
        <Map v-if="formData?.location" :center="formData?.location?.latlng" />
      </div>

      <div class="flex flex-col gap-8" v-show="step === STEPS.INFO">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          id="guestCount"
          title="Guests"
          subtitle="How many guests do you allow?"
          :count="formData.guestCount"
          @change="onCounterChange"
        />
        <hr />
        <Counter
          id="roomCount"
          title="Rooms"
          subtitle="How many rooms do you have?"
          :count="formData.roomCount"
          @change="onCounterChange"
        />
        <hr />
        <Counter
          id="bathroomCount"
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          :count="formData.bathroomCount"
          @change="onCounterChange"
        />
      </div>

      <div className="flex flex-col gap-8" v-show="step === STEPS.IMAGES">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload @change="onImageUpload" :value="formData.imageSrc" />
      </div>

      <div class="flex flex-col gap-8" v-show="step === STEPS.DESCRIPTION">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          :disabled="false"
          error=""
          v-model="formData.title"
        />
        <!-- <hr /> -->
        <Input
          id="description"
          label="Description"
          :disabled="false"
          error=""
          v-model="formData.description"
        />
      </div>

      <div class="flex flex-col gap-8" v-show="step === STEPS.PRICE">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          :disabled="isLoading"
          error=""
          required
          v-model="formData.price"
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
    </div>
  </Modal>
</template>
