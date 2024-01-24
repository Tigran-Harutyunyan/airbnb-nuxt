<script setup lang="ts">
import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";
import RentModal from "./RentModal.vue";

const { status } = useAuth();
</script>

<template>
  <template v-if="status != 'authenticated'">
    <LoginModal />
    <RegisterModal />
  </template>

  <RentModal />
</template>
