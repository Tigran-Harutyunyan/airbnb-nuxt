<script setup lang="ts">
import EmptyState from "~/components/EmptyState.vue";
import Container from "~/components/Container.vue";
import ListingCard from "~/components/listings/ListingCard.vue";
import { useMainStore } from "~/stores/store";

const { currentUser } = storeToRefs(useMainStore());

const isLoading = ref(true);

const { data } = await useFetch("/api/listings", {
  method: "get",
});

isLoading.value = false;
</script>

<template>
  <ClientOnly>
    <EmptyState showReset v-if="!data" />
  </ClientOnly>

  <Container>
    <div
      class="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
    >
      <ListingCard
        v-for="listing in data"
        :currentUser="currentUser"
        :key="listing.id"
        :data="listing"
      />
    </div>
  </Container>
</template>
