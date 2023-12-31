import dotenv from 'dotenv'
dotenv.config({
    path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production'
})
  
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        // The private keys which are only available server-side
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        // Keys within public are also exposed client-side
        public: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        }
      },
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'
    ],
    imports: {
        dirs: ['./stores'],
    },

    pinia: {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
    },
    css: ['@fortawesome/fontawesome-svg-core/styles.css'],
    build: { transpile: ['@fortawesome/vue-fontawesome', /echarts/, 'vue-echarts', 'resize-detector'] },
    nitro: {
        preset: 'firebase'
    }
})
