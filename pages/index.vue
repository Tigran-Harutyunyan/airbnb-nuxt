<script setup lang="ts">
import EmptyState from "~/components/EmptyState.vue";
import Container from "~/components/Container.vue";
import ListingCard from "~/components/listings/ListingCard.vue";
import { useStringifiedUrl } from "~/composables/useStringifiedUrl";
import { type SafeListing } from "~/types";
import { useMainStore } from "~/stores/store";

useHead({
  title: "Airbnb | Welcome to you dream location.",
});

const { rentCount } = storeToRefs(useMainStore());

const route = useRouter();
const { getUrl } = useStringifiedUrl("/api/listings");

const { data: listings, refresh } = await useFetch<SafeListing[]>(getUrl, {
  method: "get",
});

watch(
  () => route,
  (value) => {
    // Refresh data on route changes
    refresh();
  }
);

watch(
  () => rentCount.value,
  (value) => {
    // Refresh data on create new rental
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
        :key="listing.id"
        :data="listing"
      />
    </div>
  </Container>
</template>
