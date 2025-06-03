// https://nuxt.com/docs/api/configuration/nuxt-config

const TITLE = '封筒ツクール';
const COMMON_DESCRIPTION
  = 'どなたでも無料でお使いいただけるオープンソースの宛名・差出人入り封筒のA4サイズ印刷用PDFの作成ツールです。PDFはブラウザ上で作成するため、住所・名前などの情報はインターネット上に送信されないので安心してお使いいただけます。出来上がりはA4用紙を三つ折りで入れることができるサイズです。';

export default defineNuxtConfig({
  'app': {
    head: {
      htmlAttrs: {
        lang: 'ja',
        prefix: 'og: http://ogp.me/ns#',
      },
      title: TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: COMMON_DESCRIPTION },
        {
          property: 'og:title',
          content: TITLE,
        },
        {
          property: 'og:description',
          content: COMMON_DESCRIPTION,
        },
        // {
        //   hid: "og:image",
        //   property: "og:image",
        //   content: "/logo.png",
        // },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [
        // { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
    },
  },
  'compatibilityDate': '2025-03-09',
  'css': ['~/assets/css/main.css'],
  'devtools': { enabled: true },
  'eslint': {
    config: {
      stylistic: {
        semi: true,
        quotes: 'single',
        commaDangle: 'always-multiline',
      },
    },
  },
  'modules': [
    '@nuxt/ui-pro',
    '@nuxt/devtools',
    'nuxt-jsonld',

    // Nuxt ESLint
    // https://eslint.nuxt.com/packages/module
    '@nuxt/eslint',
  ],
  'nuxt-jsonld': { disableOptionsAPI: true },
  'runtimeConfig': {
    public: {
      title: TITLE,
      description: COMMON_DESCRIPTION,
    },
  },
  'ssr': false,
  'ui': {
    colorMode: false,
  },
});
