<script setup lang="ts">
import Navbar from "~/components/navbar/Navbar.vue";
</script>
<template>
  <Navbar />
  <div className="pb-20 pt-28">
    <slot />
  </div>
</template>
