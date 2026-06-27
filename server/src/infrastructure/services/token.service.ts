import { AccessTokenPayload, ITokenService, RefreshTokenPayload } from "../../application/services/IToken.service";
import { AppError } from "../../domain/errors/app.error";
import { authMessage } from "../../shared/constants/messages/authMessages";
import { statusCode } from "../../shared/constants/statusCode";
import { jwtConfig } from "../config/jwt.config";
import jwt from 'jsonwebtoken'
import { redisClient } from '../config/redis.config'

export class TokenService implements ITokenService {
    generateAccessToken(payload: AccessTokenPayload): string {
        const accessTokenSecret = jwtConfig.accessToken.secret
        if(!accessTokenSecret) {
            throw new AppError(authMessage.error.ACCESS_TOKEN_SECRET_NOT_FOUND, statusCode.BAD_REQUEST)
        }
        return jwt.sign(payload, accessTokenSecret, { expiresIn: jwtConfig.accessToken.expiresIn})
    }

    generateRefreshToken(payload: RefreshTokenPayload): string {
        const refreshTokenSecret = jwtConfig.refreshToken.secret
        if(!refreshTokenSecret) {
            throw new AppError(authMessage.error.REFRESH_TOKEN_SECRET_NOT_FOUND, statusCode.BAD_REQUEST)
        }
        return jwt.sign(payload, refreshTokenSecret, { expiresIn: jwtConfig.refreshToken.expiresIn}) 
    }

    verifyAccessToken(token: string): AccessTokenPayload {
        const accessTokenSecret = jwtConfig.accessToken.secret
        if(!accessTokenSecret) {
            throw new AppError(authMessage.error.ACCESS_TOKEN_SECRET_NOT_FOUND, statusCode.BAD_REQUEST)
        }
        return jwt.verify(token, accessTokenSecret) as AccessTokenPayload
    }

    verifyRefreshToken(token: string): RefreshTokenPayload {
        const refreshTokenSecret = jwtConfig.refreshToken.secret
        if(!refreshTokenSecret) {
            throw new AppError(authMessage.error.REFRESH_TOKEN_SECRET_NOT_FOUND, statusCode.BAD_REQUEST)
        }
        return jwt.verify(token, refreshTokenSecret) as RefreshTokenPayload
    }

    async blackListToken(token: string, expiresInSeconds: number): Promise<void> {
        await redisClient.set(`bl_${token}`, "true", "EX", expiresInSeconds)
    }

    async isTokenBlackListed(token: string): Promise<boolean> {
        const result = await redisClient.exists(`bl_${token}`)
        return result === 1
    }
}