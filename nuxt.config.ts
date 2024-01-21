// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth'],
  auth: {
    provider: {
      type: 'authjs'
    },
    // isEnabled: true,
    // baseUrl: process.env.AUTH_ORIGIN,
    // globalAppMiddleware: {
    //   isEnabled: true
    // }
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  }
});