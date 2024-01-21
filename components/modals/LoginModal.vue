<template>
  <Modal
    :disabled="isLoading"
    :isOpen="isOpen"
    title="Login"
    actionLabel="Continue"
    @onSubmit="onSubmit"
  >
    <template #body>
      <div class="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account!" />
        <Input
          id="email"
          label="Email"
          :disabled="isLoading"
          v-model="formData.email"
          :errors="errors"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          :disabled="isLoading"
          :errors="errors"
          required
        />
      </div>
    </template>
    <template #footer>
      <div class="flex flex-col gap-4 mt-3">
        <hr />
        <Button
          outline
          label="Continue with Google"
          icon="FcGoogle"
          @click="signIn('google')"
        />
        <Button
          outline
          label="Continue with Github"
          icon="AiFillGithub"
          @click="signIn('github')"
        />
        <div class="text-neutral-500 text-center mt-4 font-light">
          <p>
            First time using Airbnb?
            <span class="text-neutral-800 cursor-pointer hover:underline">
              Create an account</span
            >
          </p>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
const { signIn } = useAuth();
import Heading from "../Heading.vue";
import Input from "../inputs/Input.vue";
import Button from "../Button.vue";
import Modal from "../modals/Modal.vue";

const isLoading = ref(false);
const isOpen = ref(true);
const formData = reactive({
  email: "harutyunyan.tigran1975@gmail.com",
  password: "tigran",
});
const errors = ref([]);

const onSubmit = () => {
  isLoading.value = true;

  signIn("credentials", {
    ...formData,
    redirect: false,
  }).then((response) => {
    isLoading.value = false;

    if (response?.ok) {
      // toast.success('Logged in');
      //router.refresh();
      //loginModal.onClose();
    }

    if (response?.error) {
      // toast.error(callback.error);
    }
  });
};
</script>
