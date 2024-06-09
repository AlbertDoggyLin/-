// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      googleClientId: "707701600702-cihd19jhtng97b2ldg19mj80ad863jgk.apps.googleusercontent.com"
    }
  },
  nitro: {
    plugins: [
      '@/server/plugins/db'
    ]
  }
})
