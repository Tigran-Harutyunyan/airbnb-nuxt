<script setup lang="ts">
import FillHeartIcon from "~/components/ui/icons/FillHeartIcon.vue";
import OutlineHeartIcon from "~/components/ui/icons/OutlineHeartIcon.vue";
import { useFavorite } from "~/composables/useFavorites";
import { useMainStore } from "~/stores/store";

const { getUser } = useMainStore();

const { currentUser } = storeToRefs(useMainStore());

const { listingId } = defineProps<{
  listingId: string;
}>();

const hasFavorited = computed(() => {
  const list = currentUser.value?.favoriteIds || [];
  return list.includes(listingId);
});

const { toggleFavorite } = useFavorite({
  listingId,
});

const handleClick = async () => {
  await toggleFavorite(hasFavorited.value);
  getUser();
};
</script>

<template>
  <div
    @click.stop="handleClick"
    class="relative hover:opacity-80 transition cursor-pointer"
  >
    <OutlineHeartIcon
      class="fill-white absolute -top-[2px] -right-[2px] w-[28px] h-[28px]"
    />
    <FillHeartIcon
      class="w-6 h-6"
      :class="hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'"
    />
  </div>
</template>
