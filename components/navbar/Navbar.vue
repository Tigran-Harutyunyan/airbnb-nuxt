<script setup lang="ts">
import Categories from "~/components/navbar/Categories.vue";
import Container from "~/components/Container.vue";
import Logo from "~/components/navbar/Logo.vue";
import Search from "~/components/navbar/Search.vue";
import UserMenu from "~/components/navbar/UserMenu.vue";

const route = useRoute();

const isMainPage = computed(() => {
  return route.path === "/";
});
</script>

<template>
  <div class="fixed w-full bg-white z-10 shadow-sm">
    <div class="py-4 border-b-[1px]">
      <Container>
        <div class="flex flex-row items-center justify-between gap-3 md:gap-0">
          <Logo />
          <Search />
          <ClientOnly><UserMenu /></ClientOnly>
        </div>
      </Container>
    </div>
    <Categories v-show="isMainPage" />
  </div>
</template>
