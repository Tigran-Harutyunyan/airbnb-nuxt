<script setup lang="ts">
import EmptyState from "~/components/EmptyState.vue";
import Container from "~/components/Container.vue";
import ListingCard from "~/components/listings/ListingCard.vue";
import { useMainStore } from "~/stores/store";
import { useStringifiedUrl } from "~/composables/useStringifiedUrl";
import { type SafeListing } from "~/types";

const route = useRouter();

const { currentUser } = storeToRefs(useMainStore());

const { getUrl } = useStringifiedUrl("/api/listings");

const { data: listings, refresh } = await useFetch<SafeListing[]>(getUrl, {
  method: "get",
});

watch(
  () => route,
  (value) => {
    refresh();
  }
);
</script>

<template>
  <ClientOnly>
    <EmptyState
      showReset
      v-if="!listings || (Array.isArray(listings) && listings?.length === 0)"
    />
  </ClientOnly>

  <Container>
    <div
      class="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"
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
