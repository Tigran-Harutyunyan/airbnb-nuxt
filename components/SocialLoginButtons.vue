<script setup lang="ts">
import Button from "~/components/Button.vue";
import GithubIcon from "~/components/ui/icons/GithubIcon.vue";
import GoogleIcon from "~/components/ui/icons/GoogleIcon.vue";

const { signIn } = useAuth();
const githubLoading = ref(false);
const googleLoading = ref(false);

const githubLabel = computed(() => {
  return githubLoading.value
    ? "Redirecting to Github..."
    : "Continue with Github";
});

const googleLabel = computed(() => {
  return googleLoading.value
    ? "Redirecting to Google..."
    : "Continue with Google";
});

const onSocialLogin = (provider: string) => {
  if (provider === "google") {
    googleLoading.value = true;
  } else {
    githubLoading.value = true;
  }

  signIn(provider);
};
</script>

<template>
  <Button outline :label="googleLabel" @click.stop="onSocialLogin('google')">
    <GoogleIcon />
  </Button>
  <Button outline :label="githubLabel" @click.stop="onSocialLogin('github')">
    <GithubIcon />
  </Button>
</template>
