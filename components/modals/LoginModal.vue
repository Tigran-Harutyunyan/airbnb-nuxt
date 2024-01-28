<script setup lang="ts">
import Heading from "~/components/Heading.vue";
import Input from "~/components/inputs/Input.vue";
import ModalDivider from "~/components/modals/ModalDivider.vue";
import SocialLoginButtons from "~/components/SocialLoginButtons.vue";
import Modal from "~/components/modals/Modal.vue";
import * as yup from "yup";
import { useForm, ErrorMessage } from "vee-validate";
import { useMainStore } from "~/stores/store";
import { useToastService } from "~/composables/useToast";

const toastService = useToastService();

const { signIn } = useAuth();

const { setSigninOpen, setSignupOpen } = useMainStore();
const { isSigninOpen } = storeToRefs(useMainStore());

const isLoading = ref(false);

const { errors, values, meta, defineField, resetForm } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  }),
});

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");
const showSocial = ref(false);

const onSubmit = () => {
  isLoading.value = true;

  signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false,
  }).then((response) => {
    isLoading.value = false;
    if (response?.error) {
      toastService.add({
        severity: "error",
        summary: "Error",
        detail: "The password or email you entered is incorrect",
      });
    } else {
      setSigninOpen(false);
      toastService.add({
        severity: "success",
        summary: "Succes",
        detail: "Welcome back!",
        life: 3000,
      });
      location.reload();
    }
  });
};
</script>

<template>
  <Modal
    :isOpen="isSigninOpen"
    title="Login"
    @close="
      resetForm();
      setSigninOpen(false);
    "
  >
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account!" />

        <div>
          <Input
            id="email"
            label="Email"
            v-model.lazy="email"
            :error="errors.email"
            v-bind="emailProps"
          />
          <ErrorMessage name="email" class="error-message" />
        </div>
        <div>
          <Input
            id="password"
            label="Password (min. 6 characters)"
            type="password"
            v-model.lazy="password"
            :error="errors.password"
            v-bind="passwordProps"
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
          First time using Airbnb?
          <span
            class="text-neutral-800 cursor-pointer underline"
            @click="
              resetForm();
              setSignupOpen(true);
            "
          >
            Create an account</span
          >
        </p>
      </div>
    </div>
  </Modal>
</template>
