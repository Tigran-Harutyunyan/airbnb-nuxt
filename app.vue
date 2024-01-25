<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ModalsContainer />
  <Toast />
</template>
<script setup lang="ts">
import ModalsContainer from "~/components/modals/ModalsContainer.vue";
</script>
<style>
@import url("~/assets/css/base.css");
</style>
