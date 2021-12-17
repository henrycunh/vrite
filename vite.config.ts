import path from 'path'
import { defineConfig } from 'vite'

import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        Vue(),

        Icons({ compiler: 'vue3' }),

        Pages(),

        Layouts({
            defaultLayout: 'default',
            layoutsDir: 'src/layouts'
        }),

        AutoImport({
            imports: [
                'vue',
                'vue-router'
            ],
            dts: 'src/auto-import.d.ts'
        }),

        Components({
            dts: 'src/components.d.ts',
        }),

    ],
    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
        ],
        exclude: [
            'vue-demi',
        ],
    },

    server: {
        fs: {
            strict: true,
        },
    },
    
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import 'src/assets/styles/main.scss';`
            }
        }
    }
})
