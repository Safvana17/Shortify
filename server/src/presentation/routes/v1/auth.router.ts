import Express from "express";
import { validate } from "../../middlewares/validator";
import { userRegisterSchema, userVerifyOtpSchema } from "../../validators/user.auth.validator";
import { iAuthController } from "../../../infrastructure/di";

const router = Express.Router()


router.post('/register', validate(userRegisterSchema, 'body'), iAuthController.register)
router.post('/verify-otp', validate(userVerifyOtpSchema, 'body'), iAuthController.verifyOtp)


export default router