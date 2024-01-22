// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@sidebase/nuxt-auth', '@pinia/nuxt', "@nuxt/image", "nuxt-headlessui", "@vee-validate/nuxt"],
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'Airbnb with Nuxt3',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'Airbnb with Nuxt.js.' },

        { name: 'keywords', content: 'Nuxt Airbnb' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Raleway:wght@400;500;600;700&display=swap' }
      ]
    },
  },
  auth: {
    provider: {
      type: 'authjs'
    },
    isEnabled: true,
    baseUrl: process.env.AUTH_ORIGIN,
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