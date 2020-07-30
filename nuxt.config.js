const hooks = require('./config/hooks');

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'UTeam',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1' },
    ],
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev) {
        config.devtool = isClient ? 'eval-source-map' : 'inline-source-map';
      }

      if (isDev && isClient) {
        if (!config.module) return;
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },

    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-responsive-type': {},
        'postcss-hexrgba': {},
        'postcss-preset-env': {},
      },
      preset: {
        stage: 0,
        autoprefixer: {},
        importFrom: './static/styles/variables.css',
        preserve: false,
      },
    },
  },
  /*
  * Include these env variables to client bundle.
  * Inside server bundle process.env will be presented as is
  */
  env: {
    API_URL: process.env.API_URL,
  },
  plugins: [
    '~/plugins/filters/dateFilter.ts',
    '~/plugins/controls/index.ts',
    { src: '~/plugins/storeHooks/nuxtClientInit.ts', mode: 'client' },
  ],
  css: [
    '~/static/styles/reset.css',
    '~/static/styles/fonts.css',
    '~/static/styles/global.css',
  ],
  buildModules: ['@nuxt/typescript-build'],
  hooks,
  modules: [
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
};
