import Express from 'express'
import { ROUTES } from '../../../shared/constants/routes'
import { authHandler } from '../../middlewares/authHandler'
import { iTokenService, iUrlController } from '../../../infrastructure/di'
import { validate } from '../../middlewares/validator'
import { shortUrlSchema, UrlParamsSchema, UrlQuerySchema } from '../../validators/user.url.validator'

const router = Express.Router()

router.post(ROUTES.USER.LINK, authHandler(iTokenService), validate(shortUrlSchema, 'body'), iUrlController.shortUrl)
router.get(ROUTES.USER.GET_ALL, authHandler(iTokenService), validate(UrlQuerySchema, 'query'), iUrlController.getAllLinks)
router.get(ROUTES.USER.GET_LINK, validate(UrlParamsSchema, 'params'), iUrlController.getLink)
export default router