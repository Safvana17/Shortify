import Express from 'express'
import authRoutes from './auth.router'
import userRoutes from './user.routes'


const router = Express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)

export default router