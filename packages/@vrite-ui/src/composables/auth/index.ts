import { useStorage } from "@vueuse/core"
import { User } from "../../@types/user"
import { useGithubOAuth2 } from "./service"
import { useAuthStore } from "./store"

export const useAuth = () => {
    const { setUser, clearToken } = useAuthStore()
    const { user, token, isLogged } = toRefs(useAuthStore())
    const { authorize } = useGithubOAuth2()
    const router = useRouter()

    return {
        login () {
            authorize()
        },
        logout () {
            clearToken()
            router.push('/')
        },
        setUser,
        user,
        token,
        isLogged
    }
}