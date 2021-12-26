import dotenv from 'dotenv'
dotenv.config()

import express, { json } from 'express'
import { useAuth } from './auth.js'
import consola from 'consola'
import cors from 'cors'

const server = express()

server.use(
    json(),
    cors(),
)

try {
    const authRoute = useAuth() 
    server.use('/auth', authRoute)
} catch (error) {
    consola.error(error)
    process.exit(1)
}

server.listen(process.env.PORT || 4001, () => {
    consola.ready({
        message: `Server listening on port ${process.env.PORT || 4001}`,
        badge: true,
    })
})