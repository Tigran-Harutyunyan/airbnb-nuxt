<script setup lang="ts">
import type { SafeListing, SafeUser } from "~/types";

import Heading from "/components/Heading.vue";
import Container from "~/components/Container.vue";
import ListingCard from "~/components/listings/ListingCard.vue";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const { listings, currentUser } = defineProps<FavoritesClientProps>();
</script>

<template>
  <Container>
    <Heading title="Favorites" subtitle="List of places you favorited!" />
    <div
      class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
    >
      <ListingCard
        v-for="listing in listings"
        :currentUser="currentUser"
        :key="listing.id"
        :data="listing"
      />
    </div>
  </Container>
</template>
