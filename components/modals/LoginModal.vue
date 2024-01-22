<template>
  <Modal
    v-if="isSigninOpen"
    :disabled="isLoading"
    :isOpen="isSigninOpen"
    title="Login"
    actionLabel="Continue"
    @close="setSigninOpen(false)"
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
        <SocialLoginButtons />
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
import Heading from "~/components/Heading.vue";
import Input from "~/components/inputs/Input.vue";
import SocialLoginButtons from "~/components/SocialLoginButtons.vue";
import Modal from "~/components/modals/Modal.vue";

const { signIn } = useAuth();
import { useMainStore } from "~/stores/store";
const { setSigninOpen } = useMainStore();
const { isSigninOpen } = storeToRefs(useMainStore());

const isLoading = ref(false);

const formData = reactive({
  email: "harutyunyan.tigran1975@gmail.com",
  password: "tigran",
});
const errors = ref([]);

const onSubmit = () => {
  isLoading.value = true;

  // TODO: add ZOD validation

  signIn("credentials", {
    ...formData,
    redirect: false,
  }).then((response) => {
    isLoading.value = false;

    if (response?.ok) {
      setSigninOpen(false);
      // toast.success('Logged in');
    }

    if (response?.error) {
      // toast.error(callback.error);
    }
  });
};
</script>
