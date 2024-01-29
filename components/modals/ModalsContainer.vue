<script setup lang="ts">
import LoginModal from "./LoginModal.vue";
import RegisterModal from "./RegisterModal.vue";
import RentModal from "./RentModal.vue";
import SearchModal from "./SearchModal.vue";
const { status } = useAuth();
</script>

<template>
  <template v-if="status != 'authenticated'">
    <LoginModal />
    <RegisterModal />
  </template>
  <SearchModal />
  <RentModal />
</template>
