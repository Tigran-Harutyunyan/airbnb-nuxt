<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import Avatar from "~/components/Avatar.vue";
import HamburgerIcon from "~/components/ui/icons/HamburgerIcon.vue";
import { useMainStore } from "~/stores/store";

const AUTHENTICATED = "authenticated";

const { data, signOut, status } = useAuth();

const { setSigninOpen, setSignupOpen, setRentModalOpen, setUser } =
  useMainStore();

const { currentUser } = storeToRefs(useMainStore());

const isOpen = ref(false);

const menuItemClass =
  "px-4  text-sm hover:bg-neutral-100 transition font-semibold inline-block w-full cursor-pointer";
const menuItemLiClass = menuItemClass + " py-3";

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const links = [
  { href: "/trips", label: "My trips" },
  { href: "/favorites", label: "My favorites" },
  { href: "/reservations", label: "My reservations" },
  { href: "/properties", label: "My properties" },
];

const onRent = () => {
  if (currentUser) {
    setRentModalOpen(true);
  } else {
    setSigninOpen(true);
  }
};

if (data?.value?.user) {
  setUser(data.value.user);
}
</script>

<template>
  <div class="relative">
    <div class="flex flex-row items-center gap-3 relative">
      <div
        v-if="status === AUTHENTICATED"
        @click="onRent"
        class="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
      >
        Airbnb your home
      </div>

      <Menu as="div" class="relative inline-block text-left">
        <MenuButton>
          <div
            @click="toggleOpen"
            class="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <HamburgerIcon class="w-4 h-4 flex-shrink-0" />
            <div class="hidden md:block">
              <Avatar :src="currentUser?.image" class="max-w-[30px]" />
            </div>
          </div>
        </MenuButton>
        <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <MenuItems
            class="overflow-hidden absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-md ring-1 ring-black/5 focus:outline-none"
          >
            <!-- Use the `active` state to conditionally style the active item. -->
            <template v-if="status === AUTHENTICATED">
              <p class="px-4 pt-3 pb-3 font-bold text-sm border-b-[1px]">
                {{ currentUser?.name }}
              </p>
              <MenuItem as="li" :class="menuItemLiClass" @click="onRent()">
                Airbnb your home
              </MenuItem>
              <MenuItem
                v-slot="{ close }"
                v-for="link in links"
                :key="link.href"
                :href="link.href"
                as="li"
                :class="menuItemClass"
              >
                <nuxt-link
                  :to="link.href"
                  @click="close"
                  class="block w-full py-3"
                  >{{ link.label }}</nuxt-link
                >
              </MenuItem>

              <MenuItem as="li" :class="menuItemLiClass" @click="signOut()">
                Sign out
              </MenuItem>
            </template>
            <template v-else>
              <MenuItem
                as="li"
                :class="menuItemLiClass"
                @click="setSigninOpen(true)"
              >
                Sign in
              </MenuItem>
              <MenuItem
                as="li"
                :class="menuItemLiClass"
                @click="setSignupOpen(true)"
              >
                Sign up
              </MenuItem>
            </template>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>
