<template>
  <div class="max-w-5xl mx-auto mt-5 px-5">
    <h3 class="text-xl font-bold">Authentication Overview</h3>
    <p class="text-sm">
      See all available authentication & session information below.
    </p>
    <pre v-if="status"><span>Status:</span> {{ status }}</pre>
    <pre v-if="data"><span>Data:</span> {{ data }}</pre>
    <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
    <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre>

    <LoginModal v-if="status != 'authenticated'" />

    <button v-else @click="signOut()" class="bg-blue-200 p-3">Logout</button>
  </div>
</template>
<script setup lang="ts">
const { data, status, signOut, getCsrfToken, getProviders } = useAuth();
import LoginModal from "./components/modals/LoginModal.vue";
const providers = await getProviders();
const csrfToken = await getCsrfToken();
</script>
