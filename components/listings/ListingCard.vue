<script setup lang="ts">
import { format } from "date-fns";
import { useCountries } from "~/composables/useCountries";
import type { SafeListing, SafeReservation } from "~/types";
import Button from "~/components/Button.vue";
import HeartButton from "~/components/HeartButton.vue";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const { data, reservation, actionLabel, actionId, disabled } =
  defineProps<ListingCardProps>();

const router = useRouter();
const { getByValue } = useCountries();

const location = getByValue(data.locationValue);

const handleCancel = () => {
  if (disabled) {
    return;
  }
  //onAction?.(actionId);
};

const getPrice = () => {
  if (reservation) {
    return reservation.totalPrice;
  }

  return data.price;
};

const reservationDate = () => {
  if (!reservation) {
    return null;
  }

  const start = new Date(reservation.startDate);
  const end = new Date(reservation.endDate);

  return `${format(start, "PP")} - ${format(end, "PP")}`;
};
</script>

<template>
  <div
    @click="router.push(`/listings/${data.id}`)"
    class="col-span-1 cursor-pointer group"
  >
    <div class="flex flex-col gap-2 w-full">
      <div class="aspect-square w-full relative overflow-hidden rounded-xl">
        <NuxtImg
          fill
          class="object-cover h-full w-full group-hover:scale-110 transition"
          :src="data.imageSrc"
          alt="Listing"
        />
        <div class="absolute top-3 right-3">
          <HeartButton :listingId="data.id" />
        </div>
      </div>
      <div class="font-semibold text-lg">
        {{ location?.region }}, {{ location?.label }}
      </div>
      <div class="font-light text-neutral-500">
        {{ reservationDate() || data.category }}
      </div>
      <div class="flex flex-row items-center gap-1">
        <div class="font-semibold">$ {{ getPrice() }}</div>

        <div v-if="!reservation" class="font-light">night</div>
      </div>

      <Button
        v-if="actionLabel"
        :disabled="disabled"
        small
        :label="actionLabel"
        @click="handleCancel"
      />
    </div>
  </div>
</template>
