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
  },
  vite: {
    optimizeDeps: {
      include: [
        'remark-gfm',
        'remark-emoji',
        'remark-mdc',
        'remark-rehype',
        'rehype-raw',
        'parse5',
        'unist-util-visit',
        'unified',
        'debug'
      ]
    }
  }
})