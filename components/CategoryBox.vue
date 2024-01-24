<script setup lang="ts">
import qs from "query-string";
const { icon, label, selected } = defineProps<{
  icon: any;
  label: string;
  selected?: boolean;
}>();

const route = useRoute();
const router = useRouter();

const handleClick = () => {
  let currentQuery = {};
  const params = route?.query;

  if (params) {
    currentQuery = qs.parse(params.toString());
  }

  const updatedQuery: any = {
    ...currentQuery,
    category: label,
  };

  if (params && params.category && params.category === label) {
    delete updatedQuery.category;
  }

  const url = qs.stringifyUrl(
    {
      url: "/",
      query: updatedQuery,
    },
    { skipNull: true }
  );

  router.push(url);
};
</script>

<template>
  <div
    @click="handleClick"
    :class="`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${
          selected
            ? 'border-b-neutral-800 text-neutral-800'
            : 'border-transparent text-neutral-500'
        } 
      `"
  >
    <component :is="icon" size="26" />
    <div class="font-medium text-sm">
      {{ label }}
    </div>
  </div>
</template>
