import { AppError } from "../../../domain/errors/app.error";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserRefreshTokenInputDTO, UserRefreshTokenOutputDTO } from "../../dtos/auth/user.refreshToken.dto";
import { IUserRefreshTokenUsecase } from "../../interfaces/auth/IUser.refreshToken.usecase";
import { IHashService } from "../../services/IHash.service";
import { ITokenService } from "../../services/IToken.service";

export class UserRefreshTokenUsecase implements IUserRefreshTokenUsecase {
    constructor (
        private _userRepository: IUserRepository,
        private _tokenService: ITokenService,
        private _hashService: IHashService
    ) {}

    async execute(request: UserRefreshTokenInputDTO): Promise<UserRefreshTokenOutputDTO> {
        if(!request.token){
            throw new AppError(authMessage.error.REFRESH_TOKEN_NOT_FOUND, statusCode.UNAUTHORIZED)
        }
        const {id} = this._tokenService.verifyRefreshToken(request.token)
        if(!id){
            throw new AppError(authMessage.error.INVALID_REFRESH_TOKEN, statusCode.UNAUTHORIZED)
        }

        const user = await this._userRepository.findById(id)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.UNAUTHORIZED)
        }

        const accessToken = this._tokenService.generateAccessToken({id: user.id, email: user.email})
        const refreshToken = this._tokenService.generateRefreshToken({id: user.id})
        const hashedRefreshToken = this._hashService.hashToken(refreshToken)
        await this._userRepository.updateToken(user.id, hashedRefreshToken)

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