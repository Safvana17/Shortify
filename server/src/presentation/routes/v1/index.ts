import Express from 'express'
import authRoutes from './auth.router'


const router = Express.Router()

router.use('/auth', authRoutes)

export default router