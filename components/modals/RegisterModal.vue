<script setup lang="ts">
import * as yup from "yup";
import { useForm, ErrorMessage } from "vee-validate";
import SocialLoginButtons from "~/components/SocialLoginButtons.vue";
import ModalDivider from "~/components/modals/ModalDivider.vue";
import Heading from "~/components/Heading.vue";
import Input from "~/components/inputs/Input.vue";
import Modal from "~/components/modals/Modal.vue";
import { useToastService } from "~/composables/useToast";

const toastService = useToastService();

import { useMainStore } from "~/stores/store";

type User = {
  id: string;
};

const { setSignupOpen, setSigninOpen } = useMainStore();

const { isSignupOpen } = storeToRefs(useMainStore());

const isLoading = ref(false);

const { errors, values, meta, defineField, resetForm } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    name: yup.string().required().min(2),
  }),
});

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");
const [name, nameProps] = defineField("name");

const showSocial = ref(false);

const onSubmit = async () => {
  isLoading.value = true;

  try {
    const response = await $fetch("/api/register", {
      method: "post",
      body: values,
    });

    if (isUser(response)) {
      setSigninOpen(true);

      toastService.add({
        severity: "success",
        summary: "Success",
        detail: "You have been successfully registered. Please sign in.",
        life: 4000,
      });
    }
  } catch (e) {
    toastService.add({
      severity: "error",
      summary: "Registration error",
      detail: e?.data?.message,
      life: 10000,
    });
  } finally {
    isLoading.value = false;
  }
};

const isUser = (user: any): user is User => {
  return typeof user === "object" && user !== null && Object.hasOwn(user, "id");
};
</script>

<template>
  <Modal
    title="Sign up"
    :isOpen="isSignupOpen"
    @close="
      resetForm();
      setSignupOpen(false);
    "
  >
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
        <div>
          <Input
            id="email"
            label="Email"
            v-model="email"
            :error="errors.email"
            v-bind="emailProps"
          />
          <ErrorMessage name="email" class="error-message" />
        </div>
        <div>
          <Input
            id="name"
            label="Name"
            v-model="name"
            v-bind="nameProps"
            :error="errors.name"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>
        <div>
          <Input
            id="password"
            label="Password"
            type="password"
            v-model="password"
            v-bind="passwordProps"
            :error="errors.password"
          />
          <ErrorMessage name="password" class="error-message" />
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-6">
        <Button
          :disabled="isLoading || !meta.valid"
          label="Continue"
          type="submit"
          @click="onSubmit"
        />
      </div>
    </form>

    <ModalDivider v-if="showSocial" />

    <div class="flex flex-col gap-4 mt-4">
      <SocialLoginButtons v-if="showSocial" />

      <div class="text-neutral-500 text-center mt-2 font-light">
        <p>
          Already have an account?
          <span
            class="text-neutral-800 cursor-pointer underline"
            @click="
              resetForm();
              setSigninOpen(true);
            "
          >
            Sign In</span
          >
        </p>
      </div>
    </div>
  </Modal>
</template>
