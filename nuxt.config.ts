// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/icon'],
    app: {
        head: {
            script: [
                {
                    innerHTML: `
                        (function() {
                            try {
                                var theme = localStorage.getItem('theme') || 'dark';
                                document.documentElement.classList.add(theme);
                            } catch (e) {
                                document.documentElement.classList.add('dark');
                            }
                        })();
                    `,
                    type: 'text/javascript'
                }
            ]
        }
    },
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
                ],
                darkMode: 'class'
            }),
        ],
    },
    css: ['~/assets/styles/main.css']
})