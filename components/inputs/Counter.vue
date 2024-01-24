<script setup lang="ts">
import OutlineMinusIcon from "~/components/ui/icons/OutlineMinusIcon.vue";
import OutlinePlusIcon from "~/components/ui/icons/OutlinePlusIcon.vue";

const { id, title, subtitle, count } = defineProps<{
  title: string;
  subtitle: string;
  count: number;
  id: string;
}>();

const emit = defineEmits(["change"]);
const localCount = ref(count);

const onAdd = () => {
  localCount.value = localCount.value + 1;
  emit("change", { [id]: localCount.value });
};

const onReduce = () => {
  if (localCount.value === 1) {
    return;
  }
  localCount.value = localCount.value - 1;
  emit("change", { [id]: localCount.value });
};
</script>

<template>
  <div class="flex flex-row items-center justify-between">
    <div class="flex flex-col">
      <div class="font-medium">{{ title }}</div>
      <div class="font-light text-gray-600">
        {{ subtitle }}
      </div>
    </div>
    <div class="flex flex-row items-center gap-4">
      <div
        @click="onReduce"
        class="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
      >
        <OutlineMinusIcon />
      </div>
      <div class="font-light text-xl text-neutral-600 select-none">
        {{ count }}
      </div>
      <div
        @click="onAdd"
        class="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition"
      >
        <OutlinePlusIcon />
      </div>
    </div>
  </div>
</template>
