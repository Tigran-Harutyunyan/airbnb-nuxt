<template>
  <Modal
    v-if="isSignupOpen"
    :disabled="isLoading"
    :isOpen="isSignupOpen"
    title="Sign up"
    actionLabel="Continue"
    @close="setSignupOpen(false)"
    @onSubmit="onSubmit"
  >
    <template #body>
      <form class="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
        <Input
          id="email"
          label="Email"
          :disabled="isLoading"
          v-model="formData.email"
          :errors="errors"
          required
        />
        <Input
          id="name"
          label="Name"
          :disabled="isLoading"
          v-model="formData.name"
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
      </form>
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
import SocialLoginButtons from "~/components/SocialLoginButtons.vue";
import Heading from "~/components/Heading.vue";
import Input from "~/components/inputs/Input.vue";
import Modal from "~/components/modals/Modal.vue";

import { useMainStore } from "~/stores/store";

type User = {
  id: string;
};

const { setSignupOpen, setSigninOpen } = useMainStore();

const { isSignupOpen } = storeToRefs(useMainStore());

const isLoading = ref(false);

const formData = reactive({
  name: "",
  email: "",
  password: "",
});
const errors = ref([]);

const onSubmit = async () => {
  isLoading.value = true;
  // TODO: add ZOD validation
  try {
    const response = await $fetch("/api/register", {
      method: "post",
      body: formData,
    });

    console.log(response);

    if (isUser(response)) {
      setSigninOpen(true);
    }
  } catch (e) {
    console.log(e);
    // TODO: add error handler.
  } finally {
    isLoading.value = false;
  }
};

const isUser = (user: any): user is User => {
  return typeof user === "object" && user !== null && Object.hasOwn(user, "id");
};
</script>