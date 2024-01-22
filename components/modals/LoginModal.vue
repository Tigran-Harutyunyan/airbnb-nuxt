<template>
  <Modal :isOpen="isSigninOpen" title="Login" @close="setSigninOpen(false)">
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col gap-4">
        <Heading title="Welcome back" subtitle="Login to your account!" />

        <div>
          <Input
            id="email"
            label="Email"
            v-model="email"
            :error="errors.email"
            v-bind="emailProps"
          />
          <ErrorMessage name="email" class="text-rose-500 text-sm" />
        </div>
        <div>
          <Input
            id="password"
            label="Password(min. 6 characters)"
            type="password"
            v-model="password"
            :error="errors.password"
            v-bind="passwordProps"
          />
          <ErrorMessage name="password" class="text-rose-500 text-sm" />
        </div>
      </div>

      <div class="flex flex-col gap-4 mt-3">
        <hr class="my-2" />
        <Button
          :disabled="isLoading || !meta.valid"
          label="Continue"
          type="submit"
          @click="onSubmit"
        />
        <SocialLoginButtons />
        <div class="text-neutral-500 text-center mt-2 font-light">
          <p>
            First time using Airbnb?
            <span
              class="text-neutral-800 cursor-pointer underline"
              @click="setSignupOpen(true)"
            >
              Create an account</span
            >
          </p>
        </div>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import Heading from "~/components/Heading.vue";
import Input from "~/components/inputs/Input.vue";
import SocialLoginButtons from "~/components/SocialLoginButtons.vue";
import Modal from "~/components/modals/Modal.vue";
import * as yup from "yup";
import { useForm, ErrorMessage } from "vee-validate";
import { useMainStore } from "~/stores/store";

const { signIn } = useAuth();

const { setSigninOpen, setSignupOpen } = useMainStore();
const { isSigninOpen } = storeToRefs(useMainStore());

const isLoading = ref(false);

const { errors, values, meta, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  }),
});

const [email, emailProps] = defineField("email");
const [password, passwordProps] = defineField("password");

const formData = reactive({
  email: "harutyunyan.tigran1975@gmail.com",
  password: "tigran",
});

const onSubmit = () => {
  isLoading.value = true;

  signIn("credentials", {
    email: values.email,
    password: values.password,
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
