<template>
  <div class="mx-auto w-full flex items-center justify-center px-2 h-screen">
    <div class="flex flex-col items-center my-auto">
      <img src="/images/404.gif" class="w-40" />

      <p class="my-4 text-center font-bold">
        Ooops! We can't seem to find the page you're looking for.
      </p>
      <NuxtLink to="/" class="w-full mt-2">
        <Button label="BACK TO HOMEPAGE"></Button>
      </NuxtLink>
    </div>
  </div>
</template>
