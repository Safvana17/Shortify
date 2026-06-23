import dotenv from 'dotenv'
dotenv.config()
import app from './app'
import { env } from '../infrastructure/config/env.config'


const PORT = env.PORT || 4000
app.listen(PORT, () => {
    console.log("Server started")
})