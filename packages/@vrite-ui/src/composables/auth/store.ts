import { RemovableRef, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { User } from '../../@types/user'

type UserStoreState = {
    user: RemovableRef<User>
    oauth2State: RemovableRef<string>
    token: RemovableRef<string>
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: useStorage('vrite-user-info', {}),
        oauth2State: useStorage<string>('vrite-app-oauth2-state', ''),
        token: useStorage<string>('vrite-app-token', ''),
    } as UserStoreState),

    getters: {
        isLogged: ({ token }) => Boolean(token),
    },

    actions: {
        setUser (user: User) {
            this.user = user
        },
        generateOAuth2State() {
            this.oauth2State = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            return this.oauth2State
        },
        setToken (token: string) {
            this.token = token
        },
        clearToken () {
            this.token = ''
        }
    }
})