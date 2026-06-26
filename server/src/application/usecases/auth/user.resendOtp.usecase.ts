import { AppError } from "../../../domain/errors/app.error";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserResendOtpInputDTO, UserResendOtpOutputDTO } from "../../dtos/auth/user.resendOtp.usecase";
import { IUserResendOtpUsecase } from "../../interfaces/auth/IUser.resendOtp.usecase";
import { IMailService } from "../../services/IMail.service";
import { IOtpService } from "../../services/IOtp.service";
import { IOtpStoreService } from "../../services/IOtpStore.service";

export class UserResendOtpUsecase implements IUserResendOtpUsecase {
    constructor (
        private _userRepository: IUserRepository,
        private _mailService: IMailService,
        private _otpService: IOtpService,
        private _otpStoreService: IOtpStoreService
    ) {}

    async execute(request: UserResendOtpInputDTO): Promise<UserResendOtpOutputDTO> {
        const user = await this._userRepository.findByEmail(request.email)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const otp = this._otpService.generate()
        const hashedOtp = await this._otpService.hash(otp)
        await this._otpStoreService.saveOtp(user.id, hashedOtp, 120)
        await this._mailService.sendOtp(user.email, otp)

        return {
            success: true
        }
    }
}