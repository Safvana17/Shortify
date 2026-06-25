import Express from "express";
import { validate } from "../../middlewares/validator";
import { userRegisterSchema } from "../../validators/user.auth.validator";
import { iAuthController } from "../../../infrastructure/di";

const router = Express.Router()


router.post('/register', validate(userRegisterSchema, 'body'), iAuthController.register)

export default router