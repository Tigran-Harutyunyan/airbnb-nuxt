<script setup lang="ts">
import { useMainStore } from "~/stores/store";
const { data, signOut } = useAuth();

const { setSigninOpen, setSignupOpen } = useMainStore();

const currentUser = computed(() => {
  return data.value;
});

import MenuItem from "~/components/navbar/MenuItem.vue";
import Avatar from "~/components/Avatar.vue";
import HamburgerIcon from "~/components/ui/icons/HamburgerIcon.vue";

const router = useRouter();
const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div class="relative">
    <div class="flex flex-row items-center gap-3">
      <div
        click="onRent"
        class="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
      >
        Airbnb your home
      </div>
      <div
        @click="toggleOpen"
        class="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
      >
        <HamburgerIcon class="w-4 h-4 flex-shrink-0" />
        <div class="hidden md:block">
          <Avatar :src="currentUser?.user?.image" class="max-w-[30px]" />
        </div>
      </div>
    </div>

    <div
      v-if="isOpen"
      class="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
    >
      <div class="flex flex-col cursor-pointer">
        <template v-if="currentUser">
          <MenuItem label="My trips" @click="router.push('/trips')" />
          <MenuItem label="My favorites" @click="router.push('/favorites')" />
          <MenuItem
            label="My reservations"
            @click="router.push('/reservations')"
          />
          <MenuItem label="My properties" @click="router.push('/properties')" />
          <MenuItem label="Airbnb your home" @click="" />
          <hr />
          <MenuItem label="Logout" @click="signOut()" />
        </template>
        <template v-else>
          <MenuItem label="Login" @click="setSigninOpen(true)" />
          <MenuItem label="Sign up" @click="setSignupOpen(true)" />
        </template>
      </div>
    </div>
  </div>
</template>
