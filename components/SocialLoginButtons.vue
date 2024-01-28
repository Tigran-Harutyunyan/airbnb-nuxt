<script setup lang="ts">
import Button from "~/components/Button.vue";
import GithubIcon from "~/components/ui/icons/GithubIcon.vue";
import GoogleIcon from "~/components/ui/icons/GoogleIcon.vue";

const { signIn } = useAuth();
</script>

<template>
  <Button outline label="Continue with Google" @click.stop="signIn('google')">
    <GoogleIcon />
  </Button>
  <Button outline label="Continue with Github" @click.stop="signIn('github')">
    <GithubIcon />
  </Button>
</template>
