import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import { createPinia } from 'pinia'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import { useAuth } from './composables/auth'
import consola, { Consola } from 'consola'
import { useStorage } from '@vueuse/core'

const routes = setupLayouts(generatedRoutes)
export const createApp = ViteSSG(
    App,
    { routes },
    (ctx) => {
        Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
        ctx.app.use(createPinia())
        ctx.app.use(Toast)
        
        ctx.router.beforeEach((to, from, next) => {
            const isLogged = Boolean(useStorage('vrite-app-token', '').value)
            if (to.path !== '/login' && !isLogged && to.meta.auth) {
                consola.warn('User not logged in, redirecting to login page.')
                next('/login')
            } else {
                next()
            }
        })
    },
)
