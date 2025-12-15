// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxt/ui', 'nuxtjs-naive-ui'],
  css: ['~~/assets/css/main.css'],
  ui: {
    fonts: false
  },
  content: {
  }
})