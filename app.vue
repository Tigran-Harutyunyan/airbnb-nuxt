<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <ModalsContainer v-if="status != 'authenticated'" />
</template>
<script setup lang="ts">
import ModalsContainer from "./components/modals/ModalsContainer.vue";

const { status } = useAuth();
</script>
