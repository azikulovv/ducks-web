import tailwindcss from '@tailwindcss/vite'
import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/image', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@vite-pwa/nuxt'],
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_URL,
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
        },
      ],
    },
  },

  pwa: {
    registerType: 'autoUpdate',

    manifest: {
      name: "Duck's GameClub",
      short_name: "Duck's",
      description: "Duck's GameClub Mini App",
      theme_color: '#0a0c12',
      background_color: '#0a0c12',
      display: 'standalone',
      orientation: 'portrait',
      start_url: '/login',
      scope: '/',

      icons: [
        {
          src: '/192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
    },

    devOptions: {
      enabled: true,
      type: 'module',
    },
  },
})
