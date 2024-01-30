// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    compressPublicAssets: true,
    brotli: true,
    prerender: {
      crawlLinks: true
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@samk-dev/nuxt-vcalendar', '@sidebase/nuxt-auth', 'nuxt-delay-hydration', '@pinia/nuxt', "nuxt-headlessui", "@vee-validate/nuxt", "@nuxtjs/cloudinary", "nuxt3-leaflet", "nuxt-primevue", "@nuxt/image"],
  primevue: {
    //unstyled: true,
    importPT: { from: path.resolve(__dirname, './presets/lara/') },
    components: {
      include: ['Dropdown', 'Toast', 'ProgressSpinner'],
      exclude: ['Editor', 'Chart']
    }
  },
  delayHydration: {
    mode: 'mount',
    exclude: [
    ],
  },
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
        { rel: 'icon', type: 'image/x-icon', href: 'https://a0.muscache.com/airbnb/static/logotype_favicon-21cc8e6c6a2cca43f061d2dcabdf6e58.ico' },

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
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    config: {
      content: [
        "presets/**/*.{js,vue,ts}"
      ],
      theme: {
        extend: {
          colors: {
            'primary-50': 'rgb(var(--primary-50))',
            'primary-100': 'rgb(var(--primary-100))',
            'primary-200': 'rgb(var(--primary-200))',
            'primary-300': 'rgb(var(--primary-300))',
            'primary-400': 'rgb(var(--primary-400))',
            'primary-500': 'rgb(var(--primary-500))',
            'primary-600': 'rgb(var(--primary-600))',
            'primary-700': 'rgb(var(--primary-700))',
            'primary-800': 'rgb(var(--primary-800))',
            'primary-900': 'rgb(var(--primary-900))',
            'primary-950': 'rgb(var(--primary-950))',
            'surface-0': 'rgb(var(--surface-0))',
            'surface-50': 'rgb(var(--surface-50))',
            'surface-100': 'rgb(var(--surface-100))',
            'surface-200': 'rgb(var(--surface-200))',
            'surface-300': 'rgb(var(--surface-300))',
            'surface-400': 'rgb(var(--surface-400))',
            'surface-500': 'rgb(var(--surface-500))',
            'surface-600': 'rgb(var(--surface-600))',
            'surface-700': 'rgb(var(--surface-700))',
            'surface-800': 'rgb(var(--surface-800))',
            'surface-900': 'rgb(var(--surface-900))',
            'surface-950': 'rgb(var(--surface-950))'
          }
        }
      }
    }
  },
  build: {
    transpile: ['@vuepic/vue-datepicker']
  }
});