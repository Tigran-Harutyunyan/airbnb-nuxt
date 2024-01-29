<script setup lang="ts">
import axios from "axios";
import EmptyState from "~/components/EmptyState.vue";
import PropertiesClient from "~/components/PropertiesClient.vue";
import { useMainStore } from "~/stores/store";
import type { SafeListing } from "~/types";
import { useToastService } from "~/composables/useToast";

definePageMeta({ middleware: "auth" });

useHead({
  title: "Airbnb | My properties",
});

const toastService = useToastService();

const isLoading = ref(true);

const deletingId = ref("");

const { currentUser, rentCount } = storeToRefs(useMainStore());

const listings = ref<SafeListing[]>([]);

const getProperties = async () => {
  isLoading.value = true;

  const response = await $fetch("/api/mylistings");

  if (response && Array.isArray(response)) {
    listings.value = response;
  }
  isLoading.value = false;
};

getProperties();

const onDelete = (id: string) => {
  axios
    .delete(`/api/listings/${id}`)
    .then(() => {
      toastService.add({
        severity: "success",
        summary: "Success",
        detail: "Listing deleted",
        life: 4000,
      });
      getProperties();
    })
    .catch((error) => {
      toastService.add({
        severity: "error",
        summary: "Error",
        detail: error?.response?.data?.error,
        life: 4000,
      });
    })
    .finally(() => {
      deletingId.value = "";
    });
};

watch(
  () => rentCount.value,
  () => {
    getProperties();
  }
);
</script>

<template>
  <ClientOnly v-if="!listings.length && !isLoading">
    <EmptyState
      title="No properties found"
      subtitle="Looks like you have no properties."
    />
  </ClientOnly>

  <PropertiesClient
    v-if="listings.length"
    @delete="onDelete"
    :listings="listings"
    :currentUser="currentUser"
  />
</template>
