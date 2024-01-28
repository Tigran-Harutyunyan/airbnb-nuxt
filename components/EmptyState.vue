<script setup lang="ts">
import { useMainStore } from "~/stores/store";

const { setSigninOpen } = useMainStore();
const { currentUser } = storeToRefs(useMainStore());

const { title, subtitle, showReset } = defineProps<{
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
}>();

const router = useRouter();
</script>

<template>
  <div class="h-[60vh] flex flex-col gap-2 justify-center items-center">
    <Heading
      center
      :title="title || 'No exact matches'"
      :subtitle="subtitle || 'Try changing or removing some of your filters.'"
    />
    <div class="w-48 mt-4">
      <Button
        v-if="showReset"
        outline
        label="Remove all filters"
        @click="router.push('/')"
      />
      <Button
        v-if="showLogin && !currentUser"
        label="Login"
        @click="setSigninOpen(true)"
      />
    </div>
  </div>
</template>
