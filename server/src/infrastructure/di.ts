import { redisClient } from '../infrastructure/config/redis.config'
import { UserRegisterUsecase } from "../application/usecases/auth/user.register.usecase";
import { UserRepository } from "./repositories/User.repository";
import { HashService } from "./services/hash.service";
import { OtpService } from "./services/otp.service";
import { OtpStoreService } from "./services/otpStore.service";
import { MailService } from './services/mail.service';
import { AuthController } from '../presentation/controllers/auth.controller';
import { UserVerifyOtpUsecase } from '../application/usecases/auth/user.verifyOtp.usecase';
import { UserResendOtpUsecase } from '../application/usecases/auth/user.resendOtp.usecase';
import { UserLoginUsecase } from '../application/usecases/auth/user.login.usecase';
import { TokenService } from './services/token.service';

//repository
const iUserRepository = new UserRepository()


//service
const iHashService = new HashService()
const iOtpService = new OtpService()
const iOtpStoreService = new OtpStoreService(redisClient)
const iMailService = new MailService()
const iTokenService = new TokenService()


//usecases
const iUserRegisterUsecase = new UserRegisterUsecase (
   iUserRepository,
   iHashService,
   iOtpService,
   iOtpStoreService,
   iMailService
)
const iUserVerifyOtp = new UserVerifyOtpUsecase (
    iUserRepository,
    iOtpService,
    iOtpStoreService
)
const iUserResendOtp = new UserResendOtpUsecase (
    iUserRepository,
    iMailService,
    iOtpService,
    iOtpStoreService
)
const iUserLogin = new UserLoginUsecase (
    iUserRepository,
    iTokenService,
    iHashService
)



export const iAuthController = new AuthController (
    iUserRegisterUsecase,
    iUserVerifyOtp,
    iUserResendOtp,
    iUserLogin
)