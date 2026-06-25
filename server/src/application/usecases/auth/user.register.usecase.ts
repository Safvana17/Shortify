import { UserEntity } from "../../../domain/entities/User.entity";
import { AppError } from "../../../domain/errors/app.error";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserRegisterInputDTO, UserRegisterOutputDTO } from "../../dtos/auth/user.register.dto";
import { IUserRegisterUsecase } from "../../interfaces/auth/IUser.register.usecase";
import { IHashService } from "../../services/IHash.service";
import { IMailService } from "../../services/IMail.service";
import { IOtpService } from "../../services/IOtp.service";
import { IOtpStoreService } from "../../services/IOtpStore.service";

export class UserRegisterUsecase implements IUserRegisterUsecase {
    constructor (
        private _userRepository: IUserRepository,
        private _hashService: IHashService,
        private _otpService: IOtpService,
        private _otpStore: IOtpStoreService,
        private _maileService: IMailService

    ) {}

    async execute(request: UserRegisterInputDTO): Promise<UserRegisterOutputDTO> {
        const user = await this._userRepository.findByEmail(request.email)
        if(user){
            throw new AppError(authMessage.error.ALREADY_EXIST, statusCode.CONFLICT)
        }

        const hashedPassword = await this._hashService.hash(request.password)
        const newUser = new UserEntity(
            '',
            request.name,
            request.email,
            hashedPassword,
            false
        )

        const savedUser = await this._userRepository.create(newUser)

        const otp = this._otpService.generate()
        const hashedOtp = await this._otpService.hash(otp)
        await this._otpStore.saveOtp(savedUser.id, hashedOtp, 120)
        await this._maileService.sendOtp(savedUser.email, otp)

        return {
            success: true
        }

    }
}