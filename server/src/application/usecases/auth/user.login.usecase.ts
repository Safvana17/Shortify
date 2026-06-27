import { AppError } from "../../../domain/errors/app.error";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserLoginInputDTO, UserLoginOutputDTO } from "../../dtos/auth/user.login.dto";
import { IUserLoginUsecase } from "../../interfaces/auth/IUser.login.usecase";
import { IHashService } from "../../services/IHash.service";
import { ITokenService } from "../../services/IToken.service";

export class UserLoginUsecase implements IUserLoginUsecase {
    constructor (
        private _userRepository: IUserRepository,
        private _tokenService: ITokenService,
        private _hashService: IHashService
    ) {}

    async execute(request: UserLoginInputDTO): Promise<UserLoginOutputDTO> {
        const user = await this._userRepository.findByEmail(request.email)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.NOT_FOUND)
        }

        if(!user.isVerified){
            throw new AppError(authMessage.error.USER_NOT_VERIFIED, statusCode.FORBIDDEN)
        }
        
        const isMatch = await this._hashService.compare(request.password, user.password)
        if(!isMatch){
            throw new AppError(authMessage.error.INCORRECT_PASSWORD, statusCode.BAD_REQUEST)
        }

        const refreshToken = this._tokenService.generateRefreshToken({id: user.id})
        const accessToken = this._tokenService.generateAccessToken({email: user.email, id: user.id})
        const hashedToken = this._hashService.hashToken(refreshToken)
        await this._userRepository.updateToken(user.id, hashedToken)

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            },
            refreshToken,
            accessToken
        }
    }
}