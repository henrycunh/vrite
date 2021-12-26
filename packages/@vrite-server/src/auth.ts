import { Router } from 'express'
import axios from 'axios'
import consola from 'consola'

export const useAuth = () => {
    const auth = Router()
    const { VITRE_GITHUB_CLIENT_ID, VITRE_GITHUB_CLIENT_SECRET } = process.env
    
    if (
        typeof VITRE_GITHUB_CLIENT_ID !== 'string' ||
        typeof VITRE_GITHUB_CLIENT_SECRET !== 'string'
    ) {
        throw new Error('Missing required environment variables')
    }
    
    auth.post('/token', async (req, res) => {
        const { code } = req.body
        try {
            const url = [
                `https://github.com/login/oauth/access_token`,
                `?client_id=${VITRE_GITHUB_CLIENT_ID}`,
                `&client_secret=${VITRE_GITHUB_CLIENT_SECRET}`,
                `&code=${code}`,
            ].join('')
            const { data } = await axios.post(url, {}, { headers: { accept: 'application/json' } }) 
            res.send(data)
        } catch (error) {
            consola.error(error)
            res
                .status(500)
                .send({ message: error.message, config: error.config })
        }
    })

    return auth
}