<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <NuxtImg
    @click="router.push('/')"
    class="hidden md:block cursor-pointer"
    src="/images/logo.png"
    height="31"
    width="100"
    alt="Logo"
  />
</template>
