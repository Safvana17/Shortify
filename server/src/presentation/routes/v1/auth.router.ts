import Express from "express";
import { validate } from "../../middlewares/validator";
import { userLoginSchema, userRegisterSchema, userResendOtpSchema, userVerifyOtpSchema } from "../../validators/user.auth.validator";
import { iAuthController, iTokenService } from "../../../infrastructure/di";
import { ROUTES } from "../../../shared/constants/routes";
import { authHandler } from "../../middlewares/authHandler";

const router = Express.Router()


router.post(ROUTES.AUTH.REGISTER, validate(userRegisterSchema, 'body'), iAuthController.register)
router.post(ROUTES.AUTH.VERIFY_OTP, validate(userVerifyOtpSchema, 'body'), iAuthController.verifyOtp)
router.post(ROUTES.AUTH.RESEND_OTP, validate(userResendOtpSchema, 'body'), iAuthController.resendOtp)
router.post(ROUTES.AUTH.LOGIN, validate(userLoginSchema, 'body'), iAuthController.login)
router.post(ROUTES.AUTH.REFRESH, iAuthController.refreshToken)
router.post(ROUTES.AUTH.LOGOUT, authHandler(iTokenService), iAuthController.logout)


export default router