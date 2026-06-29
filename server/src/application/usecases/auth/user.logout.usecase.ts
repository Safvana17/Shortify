import { AppError } from "../../../domain/errors/app.error";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { env } from "../../../infrastructure/config/env.config";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { IUserLogoutUsecase } from "../../interfaces/auth/IUser.logout.usecase";
import { IHashService } from "../../services/IHash.service";
import { ITokenService } from "../../services/IToken.service";

export class UserLogout implements IUserLogoutUsecase {
    constructor (
        private _userRepository: IUserRepository,
        private _hashService: IHashService,
        private _tokenService: ITokenService
    ) {}

    async execute(refreshToken: string, accessToken: string): Promise<void> {
        if(accessToken){
            const expireInSeconds = env.ACCESS_TOKEN_MAX_AGE ? Math.floor(env.ACCESS_TOKEN_MAX_AGE / 1000): 3600
            await this._tokenService.blackListToken(accessToken, expireInSeconds)
        }

        if(!refreshToken){
            throw new AppError(authMessage.error.REFRESH_TOKEN_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const payload = this._tokenService.verifyRefreshToken(refreshToken)
        const { id } = payload
        if(!id){
            throw new AppError(authMessage.error.UNAUTHORIZED, statusCode.UNAUTHORIZED)
        }

        const user = await this._userRepository.findById(id)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.NOT_FOUND)
        }
        

        const hashedRefreshToken = await this._hashService.hashToken(refreshToken)
        await this._userRepository.revokeRefreshToken(hashedRefreshToken)
    }
}