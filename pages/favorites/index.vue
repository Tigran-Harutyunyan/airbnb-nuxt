<script setup lang="ts">
import EmptyState from "~/components/EmptyState.vue";
import FavoritesClient from "~/components/clients/FavoritesClient.vue";
import { useMainStore } from "~/stores/store";

useHead({
  title: "Airbnb | My favourits",
});

definePageMeta({ middleware: "auth" });

const { currentUser, favouritesCount } = storeToRefs(useMainStore());

const isLoading = ref(false);

const listings = ref([]);

const getFavorites = async () => {
  isLoading.value = true;
  const response = await $fetch("/api/favorites");

  if (response && Array.isArray(response)) {
    listings.value = response;
  }
  isLoading.value = false;
};

getFavorites();

watch(
  () => favouritesCount.value,
  () => {
    getFavorites();
  }
);
</script>

<template>
  <ClientOnly v-if="currentUser && !listings.length && !isLoading">
    <EmptyState
      title="No favorites found"
      subtitle="Looks like you have no favorite listings."
    />
  </ClientOnly>

  <FavoritesClient
    v-if="listings.length"
    :listings="listings"
    :currentUser="currentUser"
  />
</template>
