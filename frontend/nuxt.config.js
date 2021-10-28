export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Master',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/neural.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/charts-vue.js', ssr: false },
    { src: '~plugins/carbon.js', ssr: false },
    { src: '~plugins/particles.js', ssr: false },
    { src: '~plugins/heatmap.js', ssr: false },
    // { src: '~plugins/ml5.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/moment-module#readme
    '@nuxtjs/moment',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // 'nuxt-leaflet'
  modules: [
    '@nuxtjs/axios',
    'nuxt-leaflet',
    // [
    //   'nuxt-gmaps',
    //   {
    //     key: 'AIzaSyBcrfNS-3Xk8X1qpFIJEMxYsJRRhxZ55M8',
    //   },
    // ],
  ],
  axios: {
    baseURL: 'http://localhost:3030',
    proxyHeaders: false,
    credentials: false,
  },
  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['charts-vue'],
    vendor: ['ml5'],
  },
}
