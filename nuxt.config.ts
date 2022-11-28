// https://nuxt.com/docs/api/configuration/nuxt-config

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";

export default defineNuxtConfig({
  ssr: false,
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
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Noto+Color+Emoji:400&display=swap",
        },
      ],
    },
  },
  css: ["~/assets/index.scss"],
  modules: ["unplugin-icons/nuxt", "@nuxtjs/tailwindcss"],
  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {
        configPath: "tailwind.config.ts",
      },
      autoprefixer: {},
    },
  },
  typescript: {
    strict: true,
    shim: false,
    typeCheck: true,
  },
  vite: {
    plugins: [
      // ...
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        dts: true,
        resolvers: [IconsResolver({})],
      }),
    ],
  },
});
