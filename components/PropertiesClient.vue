<script setup lang="ts">
import Container from "~/components/Container.vue";
import ListingCard from "~/components/listings/ListingCard.vue";
import Heading from "~/components/Heading.vue";
import type { SafeUser, SafeListing } from "~/types";

interface TripsClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}
const emit = defineEmits(["delete"]);

const { listings, currentUser } = defineProps<TripsClientProps>();

const deletingId = ref("");

const onCancel = (id: string) => {
  deletingId.value = id;
  emit("delete", id);
};
</script>

<template>
  <Container>
    <Heading title="Properties" subtitle="List of your properties" />
    <div
      class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
    >
      <ListingCard
        v-for="listing in listings"
        :key="listing.id"
        :data="listing"
        :actionId="listing.id"
        @onAction="onCancel"
        :disabled="deletingId === listing.id"
        actionLabel="Delete property"
        :currentUser="currentUser"
      />
    </div>
  </Container>
</template>
