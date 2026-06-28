import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB } from "../infrastructure/config/mongo.config";
import routes from './routes/index'
import { env } from "../infrastructure/config/env.config";
import { errorHandler } from "./middlewares/errorHandler";



const app = express();

connectDB()

app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true,
}))

app.use((req, res, next) => {
    console.log(`recieving ${req.method} from ${req.url}`)
    next()
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/test', (req, res) => {
    res.status(200).json({success: true, message: 'Test rout hitted'})
})

app.use('/api', routes)

app.use(errorHandler)

export default app
