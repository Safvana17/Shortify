import express from "express";
import { connectDB } from "../infrastructure/config/mongo.config";
import routes from './routes/index'



const app = express();

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/test', (req, res) => {
    res.status(200).json({success: true, message: 'Test rout hitted'})
})

app.use('/api', routes)

export default app
