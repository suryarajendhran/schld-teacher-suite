export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Teacher Portal - Scholared',
    meta: [
      { charset: 'utf-8' },
      { property: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        property: 'description',
        content: 'The portal for teachers to access to Scholared tools',
      },
      {
        hid: `og:description`,
        property: 'og:description',
        content: 'The portal for teachers to access to Scholared tools',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_io/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon_io/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon_io/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicon_io/apple-touch-icon.png',
      },
    ],
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js' },
      {
        src: 'https://kit.fontawesome.com/a135911755.js',
        defer: true,
      },
    ],
  },

  // router: {
  //   middleware: 'authenticate',
  // },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/override_styles.scss', '@/assets/transitions.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/google-analytics'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/bulma',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['nuxt-buefy', { materialDesignIcons: true }],
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyCmlj87RL7xg7zsWNkSMXK7CNtHCynvJyA',
      authDomain: 'scholared-f3d6d.firebaseapp.com',
      databaseURL: 'https://scholared-f3d6d.firebaseio.com',
      projectId: 'scholared-f3d6d',
      storageBucket: 'scholared-f3d6d.appspot.com',
      messagingSenderId: '860814167376',
      appId: '1:860814167376:web:56e11c85f0bccbaaef3055',
      measurementId: 'G-E5VZLRF3PJ',
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChanged',
          subscribeManually: false,
        },
        static: true, // default
        // emulatorPort: 9099,
        // emulatorHost: 'http://localhost',
      }, // Just as example. Can be any other service.
      database: true,
    },
  },

  googleAnalytics: {
    id: 'G-RCQFXW4LF8',
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
  },
}
