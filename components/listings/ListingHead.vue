<script setup lang="ts">
import Heading from "~/components/Heading.vue";
import HeartButton from "~/components/HeartButton.vue";
import { type IAccount } from "~/types";
import { useCountries } from "~/composables/useCountries";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: IAccount;
}

const { title, locationValue, imageSrc, id } = defineProps<ListingHeadProps>();

const { getByValue } = useCountries();

const location = getByValue(locationValue);
</script>

<template>
  <Heading
    :title="title"
    :subtitle="`${location?.region}, ${location?.label}`"
  />
  <div class="w-full h-[60vh] overflow-hidden rounded-xl relative">
    <NuxtImg :src="imageSrc" fill class="object-cover w-full" alt="Image" />
    <div class="absolute top-5 right-5">
      <HeartButton :listingId="id" />
    </div>
  </div>
</template>
