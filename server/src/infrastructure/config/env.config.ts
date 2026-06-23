import dotenv from 'dotenv'
import { envSchema } from './env.validation'
import { authMessage } from '../../shared/constants/messages/authMessages'


dotenv.config()

const parsedEnv = envSchema.safeParse(process.env)

if(!parsedEnv.success){
    console.error(authMessage.error.ENV_VALIDATION_FAILED, parsedEnv.error.format())
    process.exit(1)
}


export const env = parsedEnv.data