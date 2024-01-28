<script setup lang="ts">
import axios from "axios";
import EmptyState from "~/components/EmptyState.vue";
import TripsClient from "~/components/TripsClient.vue";
import { useMainStore } from "~/stores/store";
import type { SafeReservation } from "~/types";

definePageMeta({ middleware: "auth" });

import { useToastService } from "~/composables/useToast";

const toastService = useToastService();

const isLoading = ref(true);

const deletingId = ref("");

const { currentUser } = storeToRefs(useMainStore());
const reservations = ref<SafeReservation[]>([]);

const getReservations = async () => {
  isLoading.value = true;
  const response = await $fetch("/api/reservations", {
    method: "post",
    body: { userId: true },
  });

  if (response && Array.isArray(response)) {
    reservations.value = response;
  }
  isLoading.value = false;
};

getReservations();

const onDelete = (id: string) => {
  axios
    .delete(`/api/reservations/${id}`)
    .then(() => {
      toastService.add({
        severity: "success",
        summary: "Success",
        detail: "Reservation cancelled",
        life: 4000,
      });
      getReservations();
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
</script>

<template>
  <ClientOnly v-if="!currentUser">
    <EmptyState title="Unauthorized" subtitle="Please login" showLogin />
  </ClientOnly>

  <ClientOnly v-if="currentUser && !reservations.length && !isLoading">
    <EmptyState
      title="No trips found"
      subtitle="Looks like you havent reserved any trips."
    />
  </ClientOnly>

  <TripsClient
    v-if="reservations.length"
    @delete="onDelete"
    :reservations="reservations"
    :currentUser="currentUser"
  />
</template>
