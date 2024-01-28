<script setup lang="ts">
import { differenceInDays, eachDayOfInterval } from "date-fns";
import Container from "~/components/Container.vue";
import ListingHead from "~/components/listings/ListingHead.vue";
import ListingInfo from "~/components/listings/ListingInfo.vue";
import ListingReservation from "~/components/listings/ListingReservation.vue";

import { useToastService } from "~/composables/useToast";

import { useCategories } from "~/composables/useCategories";

import type { SafeListing, SafeUser, Range } from "~/types";
import { useMainStore } from "~/stores/store";

const toastService = useToastService();

const router = useRouter();
const { params } = useRoute();

const { setSigninOpen } = useMainStore();

const { currentUser } = storeToRefs(useMainStore());

const categories = useCategories();

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
}

const { listing } = defineProps<ListingClientProps>();

const initialDateRange = ref<Range>({
  startDate: new Date(),
  endDate: new Date(),
});

const category = computed(() => {
  return categories.find((items) => items.label === listing.category);
});

const isLoading = ref();
const dateRange = ref(initialDateRange);

const onCreateReservation = async () => {
  if (!currentUser.value) {
    return setSigninOpen(true);
  }

  isLoading.value = true;

  try {
    const response = await $fetch("/api/reservation", {
      method: "post",
      body: {
        totalPrice: totalPrice.value,
        startDate: dateRange.value.startDate,
        endDate: dateRange.value.endDate,
        listingId: listing?.id,
      },
    });

    if (response) {
      toastService.add({
        severity: "success",
        summary: "Success",
        detail: "Listing reserved!",
        life: 3000,
      });

      router.push("/trips");
    }
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
};

const setDateRange = (data: Range) => {
  dateRange.value = JSON.parse(JSON.stringify(data));
};

const dayCount = computed(() => {
  if (dateRange.value.startDate && dateRange.value.endDate) {
    return differenceInDays(dateRange.value.endDate, dateRange.value.startDate);
  }
  return 0;
});

const totalPrice = computed(() => {
  if (dayCount.value && listing.price) {
    return dayCount.value * listing.price;
  } else {
    return listing.price;
  }
});

const disabledDates = computed(() => {
  let dates: Date[] = [];
  if (
    reservations.value &&
    Array.isArray(reservations.value) &&
    reservations.value.length
  ) {
    reservations.value?.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
  }

  return dates;
});

let reservations = ref([]);

const getReservations = async () => {
  try {
    const response = await $fetch("/api/reservations", {
      method: "post",
      body: {
        listingId: params.listingId,
      },
    });

    if (response && Array.isArray(response)) {
      reservations.value = response;
    }
  } catch (e) {}
};

getReservations();
</script>

<template>
  <Container>
    <div class="max-w-screen-lg mx-auto">
      <div class="flex flex-col gap-6">
        <ListingHead
          :title="listing.title"
          :imageSrc="listing.imageSrc"
          :locationValue="listing.locationValue"
          :id="listing.id"
          :currentUser="currentUser"
        />
        <div class="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <ListingInfo
            :user="listing.user"
            :category="category"
            :description="listing.description"
            :roomCount="listing.roomCount"
            :guestCount="listing.guestCount"
            :bathroomCount="listing.bathroomCount"
            :locationValue="listing.locationValue"
          />
          <div class="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation
              :price="listing.price"
              :totalPrice="totalPrice"
              :dateRange="dateRange"
              @onChangeDate="setDateRange"
              @onSubmit="onCreateReservation"
              :disabled="isLoading"
              :disabledDates="disabledDates"
            />
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
