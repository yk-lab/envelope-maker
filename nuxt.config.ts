// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ["~/assets/index.scss"],
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
});
