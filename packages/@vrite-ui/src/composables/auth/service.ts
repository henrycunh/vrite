import axios from 'axios'
import { useAuthStore } from './store'

type OAuth2Configuration = {
    clientId: string
    clientSecret?: string
    redirectURI: string
    scope: string
    authorizationEndpoint: string
    tokenEndpoint: string
}


const useAuthService = (config: OAuth2Configuration) => {
    const { generateOAuth2State, setToken } = useAuthStore()
    const { oauth2State, token } = toRefs(useAuthStore())

    return {
        authorize () {
            const state = generateOAuth2State()
            const url = `${config.authorizationEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectURI}&scope=${config.scope}&state=${state}`
            window.location.href = url
        },

        async getToken (code: string, state: string) {
            if (state !== oauth2State.value) {
                console.error('OAuth2 state mismatch', {
                    provided: state,
                    expected: oauth2State.value,
                })
                return
            }

            const { data } = await axios.post(config.tokenEndpoint, {
                code,
            })

            const token = data.access_token as string
            setToken(token)
            
            return token
        }
    }
}

export const useGithubOAuth2 = () => {
    const { 
        APP_CLIENT_ID, 
        APP_CLIENT_SECRET, 
        APP_URI,
        APP_SERVER_URI
    } = import.meta.env
    
    if (
        typeof APP_CLIENT_ID !== 'string' 
        || typeof APP_CLIENT_SECRET !== 'string'
        || typeof APP_URI !== 'string'
    ) {
        throw new Error('Missing required environment variables')
    }
    
    const { token } = toRefs(useAuthStore())

    const joinRedirectURI = (uri: string) => uri.replace(/\/$/, '') + '/auth/callback' 

    const configuration: OAuth2Configuration = {
        clientId: APP_CLIENT_ID,
        clientSecret: APP_CLIENT_SECRET,
        redirectURI: joinRedirectURI(APP_URI),
        scope: 'read:user user:email',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: APP_SERVER_URI + '/auth/token',
    }

    async function getUserInfo () {
        const { setUser } = useAuthStore()

        const { data } = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
        })
        setUser(data)
        return data
    }

    return {
        ...useAuthService(configuration),
        getUserInfo,
    }
}