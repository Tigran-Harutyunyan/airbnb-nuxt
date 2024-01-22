<script setup lang="ts">
import Button from "./Button.vue";
import GithubIcon from "./ui/icons/GithubIcon.vue";
import GoogleIcon from "./ui/icons/GoogleIcon.vue";

const { signIn } = useAuth();
</script>

<template>
  <Button outline label="Continue with Google" @click="signIn('google')">
    <GoogleIcon />
  </Button>
  <Button outline label="Continue with Github" @click="signIn('github')">
    <GithubIcon />
  </Button>
</template>
