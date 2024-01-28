<script setup lang="ts">
import axios from "axios";
import EmptyState from "~/components/EmptyState.vue";
import ReservationsClient from "~/components/ReservationsClient.vue";
import { useMainStore } from "~/stores/store";

import { useToastService } from "~/composables/useToast";

const toastService = useToastService();
const { currentUser } = storeToRefs(useMainStore());

const isLoading = ref(true);

const reservations = ref([]);

const getReservations = async () => {
  isLoading.value = true;

  const response = await $fetch("/api/reservations", {
    method: "post",
    body: { authorId: true },
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
    });
};
</script>
<template>
  <ClientOnly v-if="!currentUser">
    <EmptyState title="Unauthorized" subtitle="Please login" />
  </ClientOnly>

  <ClientOnly v-if="currentUser && !reservations.length && !isLoading">
    <EmptyState
      title="No reservations found"
      subtitle="Looks like you have no reservations on your properties."
    />
  </ClientOnly>

  <ReservationsClient
    v-if="reservations.length && currentUser"
    @delete="onDelete"
    :reservations="reservations"
    :currentUser="currentUser"
  />
</template>
