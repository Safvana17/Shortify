import Express from 'express'
import { ROUTES } from '../../../shared/constants/routes'
import { authHandler } from '../../middlewares/authHandler'
import { iTokenService, iUrlController } from '../../../infrastructure/di'
import { validate } from '../../middlewares/validator'
import { shortUrlSchema } from '../../validators/user.url.validator'

const router = Express.Router()

router.post(ROUTES.USER.LINK, authHandler(iTokenService), validate(shortUrlSchema, 'body'), iUrlController.shortUrl)

export default router