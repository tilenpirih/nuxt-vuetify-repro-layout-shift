// Same module setup as a typical Nuxt 4 app: SSR on, viewport client hints on, no reload on first request.
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['vuetify-nuxt-module'],
  vuetify: {
    moduleOptions: {
      prefixComposables: ['useLayout'],
      ssrClientHints: {
        reloadOnFirstRequest: false,
        viewportSize: true,
      },
    },
    vuetifyOptions: {
      display: { mobileBreakpoint: 'md' },
    },
  },
})
