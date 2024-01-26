import { defineStore } from "pinia";
import { type IAccount } from "~/types";


export const useMainStore = defineStore("main", () => {
  const isSigninOpen = ref(false);
  const isSignupOpen = ref(false);
  const isRentModalOpen = ref(false);
  const currentUser = ref<IAccount>();

  function setUser(user: IAccount) {
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

  async function getUser() {
    const { data } = await useFetch("/api/user", {
      method: "get",
    });

    if (data?.value?.email) {
      setUser(data?.value);
    }
  }

  return {
    isSigninOpen,
    isSignupOpen,
    isRentModalOpen,
    setRentModalOpen,
    setSigninOpen,
    setSignupOpen,
    getUser,
    currentUser
  };
});
