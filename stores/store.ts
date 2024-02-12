import { defineStore } from "pinia";
import { type IAccount } from "~/types";

export const useMainStore = defineStore("main", () => {
  const isSigninOpen = ref(false);
  const isSignupOpen = ref(false);
  const isRentModalOpen = ref(false);
  const isSearchModalOpen = ref(false);
  const currentUser = ref<IAccount>();

  const rentCount = ref(0); // dummy counter to watch for in main page to refresh after new rent.
  const favouritesCount = ref(0); // dummy counter to watch for in favorites page to refresh after toggling the favourite.

  function setUser(user: IAccount) {
    currentUser.value = user;
  }

  function setRentModalOpen(isOpen: boolean) {
    isRentModalOpen.value = isOpen;
  }

  function setSearchModalOpen(isOpen: boolean) {
    isSearchModalOpen.value = isOpen;
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

  function setRentCount() {
    rentCount.value++;
  }

  function setFavouriteCount() {
    favouritesCount.value++;
  }

  return {
    isSigninOpen,
    isSignupOpen,
    isRentModalOpen,
    currentUser,
    rentCount,
    favouritesCount,
    isSearchModalOpen,
    setRentModalOpen,
    setSigninOpen,
    setSignupOpen,
    getUser,
    setRentCount,
    setFavouriteCount,
    setSearchModalOpen,
    setUser
  };
});
