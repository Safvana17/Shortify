import Express from 'express'
import authRoutes from './auth.router'
import userRoutes from './user.routes'
import { ROUTES } from '../../../shared/constants/routes'
import { validate } from '../../middlewares/validator'
import { UrlParamsSchema } from '../../validators/user.url.validator'
import { iUrlController } from '../../../infrastructure/di'


const router = Express.Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.get(ROUTES.USER.GET_LINK, validate(UrlParamsSchema, 'params'), iUrlController.getLink)

export default router