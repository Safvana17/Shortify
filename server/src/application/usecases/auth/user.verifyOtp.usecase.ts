import { AppError } from "../../../domain/errors/app.error";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserVerifyOtpInputDTO, UserVerifyOtpOutputDTO } from "../../dtos/auth/user.verifyOtp.dto";
import { IUserVerifyOtpUsecase } from "../../interfaces/auth/IUser.verifyOtp.usecase";
import { IOtpService } from "../../services/IOtp.service";
import { IOtpStoreService } from "../../services/IOtpStore.service";

export class UserVerifyOtpUsecase implements IUserVerifyOtpUsecase {
    constructor (
        private _userRepository: IUserRepository,
        private _otpService: IOtpService,
        private _otpStoreService: IOtpStoreService
    ) {}

    async execute(request: UserVerifyOtpInputDTO): Promise<UserVerifyOtpOutputDTO> {
        const user = await this._userRepository.findByEmail(request.email)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.NOT_FOUND)
        }
        if(user.isVerified){
            throw new AppError(authMessage.error.ALREADY_VERIFIED, statusCode.BAD_REQUEST)
        }

        const userId = user.id

        const storedOtp = await this._otpStoreService.getOtp(userId)
        if(!storedOtp){
            throw new AppError(authMessage.error.OTP_EXPIRED, statusCode.BAD_REQUEST)
        }
        
        const isValid = await this._otpService.compare(request.otp, storedOtp)
        if(!isValid){
            throw new AppError(authMessage.error.INVALID_OTP, statusCode.BAD_REQUEST)
        }

        user.isVerified = true
        await this._userRepository.update(userId, user)
        await this._otpStoreService.deleteOtp(userId)

        return {
            success: true
        }

    }
}