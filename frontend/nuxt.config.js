// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  components: true,
  css: ['~/assets/css/index.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    layoutTransition: { name: 'fade', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      BACKEND_URI: process.env.BACKEND_URI || 'http://localhost:5000/api',
    },
  },
  modules: ['@pinia/nuxt', '@nuxt/image', '@vee-validate/nuxt'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  app: {
    head: {
      title: 'Gestion Agendas',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'description',
          content: 'Application destinée pour la gestion des agendas.',
        },
      ],
    },
  },
});
