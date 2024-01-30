<script setup lang="ts">
import ListingClient from "~/components/clients/ListingClient.vue";
import EmptyState from "~/components/EmptyState.vue";

const { params } = useRoute();

const { data: listing } = await useFetch(`/api/listings/${params.listingId}`);

useHead({
  title: `Airbnb | ${listing?.value?.title}`,
});
</script>

<template>
  <template v-if="!listing">
    <ClientOnly>
      <EmptyState />
    </ClientOnly>
  </template>

  <ClientOnly v-else>
    <ListingClient :listing="listing" />
  </ClientOnly>
</template>
