<script setup lang="ts">
import { type SafeUser } from "~/types";
import Avatar from "~/components/Avatar.vue";
import ListingCategory from "~/components/listings/ListingCategory.vue";
import Map from "~/components/Map.vue";
import { useCountries } from "~/composables/useCountries";

const { getByValue } = useCountries();

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: any;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const {
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
} = defineProps<ListingInfoProps>();

const coordinates = getByValue(locationValue)?.latlng;
</script>

<template>
  <div class="col-span-4 flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <div class="text-xl font-semibold flex flex-row items-center gap-2">
        <div>Hosted by {{ user?.name }}</div>
        <Avatar :src="user?.image" />
      </div>
      <div class="flex flex-row items-center gap-4 font-light text-neutral-500">
        <div>{{ guestCount }} guests</div>
        <div>{{ roomCount }} rooms</div>
        <div>{{ bathroomCount }} bathrooms</div>
      </div>
    </div>
    <hr />

    <ListingCategory
      v-if="category"
      :icon="category.icon"
      :label="category?.label"
      :description="category?.description"
    />
    <hr />
    <div class="text-lg font-light text-neutral-500">
      {{ description }}
    </div>
    <hr />
    <Map :center="coordinates" v-if="coordinates" />
  </div>
</template>
