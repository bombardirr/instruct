// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/icon'],
    vite: {
        plugins: [
            tailwindcss({
                content: [
                    './app/**/*.{js,vue,ts}',
                    './components/**/*.{js,vue,ts}',
                    './layouts/**/*.vue',
                    './pages/**/*.vue',
                    './plugins/**/*.{js,ts}',
                    './app.vue',
                    './error.vue'
                ]
            }),
        ],
    },
    css: ['~/assets/styles/main.css']
})