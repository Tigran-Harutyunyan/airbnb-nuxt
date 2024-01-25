import { defineStore } from "pinia";
import { type IUser } from "~/types";


export const useMainStore = defineStore("main", () => {
  const isSigninOpen = ref(false);
  const isSignupOpen = ref(false);
  const isRentModalOpen = ref(false);
  const currentUser = ref<IUser>();

  function setUser(user: IUser) {
    currentUser.value = user;
  }

  function setRentModalOpen(isOpen: boolean) {
    isRentModalOpen.value = isOpen;
  }

  function setSigninOpen(isOpen: boolean) {
    if (isOpen && isSignupOpen.value) {
      isSignupOpen.value = false;
    }

    isSigninOpen.value = isOpen;
  }

  function setSignupOpen(isOpen: boolean) {
    if (isOpen && isSigninOpen.value) {
      isSigninOpen.value = false;
    }

    isSignupOpen.value = isOpen;
  }

  return {
    isSigninOpen,
    isSignupOpen,
    isRentModalOpen,
    setRentModalOpen,
    setSigninOpen,
    setSignupOpen,
    setUser,
    currentUser
  };
});
