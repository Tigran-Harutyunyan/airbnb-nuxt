<script setup lang="ts">
import Container from "~/components/Container.vue";
import ListingCard from "~/components/listings/ListingCard.vue";
import Heading from "~/components/Heading.vue";
import type { SafeUser, SafeReservation } from "~/types";

const emit = defineEmits(["delete"]);

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const { reservations, currentUser } = defineProps<ReservationsClientProps>();

const deletingId = ref("");

const onCancel = (id: string) => {
  deletingId.value = id;
  emit("delete", id);
};
</script>

<template>
  <Container>
    <Heading title="Reservations" subtitle="Bookings on your properties" />
    <div
      className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
    >
      <ListingCard
        v-for="reservation in reservations"
        :key="reservation.id"
        :data="reservation.listing"
        :reservation="reservation"
        :actionId="reservation.id"
        @onAction="onCancel"
        :disabled="deletingId === reservation.id"
        actionLabel="Cancel guest reservation"
        :currentUser="currentUser"
      />
    </div>
  </Container>
</template>
