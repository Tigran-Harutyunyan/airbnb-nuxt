import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const isSigninOpen = ref(false);
  const isSignupOpen = ref(false);

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
    setSigninOpen,
    setSignupOpen
  };
});
