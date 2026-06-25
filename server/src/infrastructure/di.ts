import { redisClient } from '../infrastructure/config/redis.config'
import { UserRegisterUsecase } from "../application/usecases/auth/user.register.usecase";
import { UserRepository } from "./repositories/User.repository";
import { HashService } from "./services/hash.service";
import { OtpService } from "./services/otp.service";
import { OtpStoreService } from "./services/otpStore.service";
import { MailService } from './services/mail.service';
import { AuthController } from '../presentation/controllers/auth.controller';

//repository
const iUserRepository = new UserRepository()


//service
const iHashService = new HashService()
const iOtpService = new OtpService()
const iOtpStoreService = new OtpStoreService(redisClient)
const iMailService = new MailService()


//usecases
const iUserRegisterUsecase = new UserRegisterUsecase (
   iUserRepository,
   iHashService,
   iOtpService,
   iOtpStoreService,
   iMailService
)



export const iAuthController = new AuthController (
    iUserRegisterUsecase,
)