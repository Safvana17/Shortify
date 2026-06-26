import Express from "express";
import { validate } from "../../middlewares/validator";
import { userRegisterSchema, userResendOtpSchema, userVerifyOtpSchema } from "../../validators/user.auth.validator";
import { iAuthController } from "../../../infrastructure/di";
import { ROUTES } from "../../../shared/constants/routes";

const router = Express.Router()


router.post(ROUTES.AUTH.REGISTER, validate(userRegisterSchema, 'body'), iAuthController.register)
router.post(ROUTES.AUTH.VERIFY_OTP, validate(userVerifyOtpSchema, 'body'), iAuthController.verifyOtp)
router.post(ROUTES.AUTH.RESEND_OTP, validate(userResendOtpSchema, 'body'), iAuthController.resendOtp)

export default router