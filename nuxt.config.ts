// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
        prefix: "og: http://ogp.me/ns#",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        // { name: "description", content: COMMON_DESCRIPTION },
        // {
        //   hid: "og:image",
        //   property: "og:image",
        //   content: "/logo.png",
        // },
        { name: "twitter:card", content: "summary" },
      ],
      link: [
        // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },
  css: ["~/assets/index.css"],
  modules: ["@element-plus/nuxt", "@nuxtjs/google-fonts"],
  googleFonts: {
    display: "swap",
    families: {
      "Noto+Sans+JP": [400, 700],
      "Noto+Color+Emoji": [400],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
});
