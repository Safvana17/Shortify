import mongoose from "mongoose";
import { env } from "./env.config";

export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI)
        console.log('Database connected')
    } catch (error) {
        console.error('Failed to connect to database', error)
        process.exit(1)
    }
}