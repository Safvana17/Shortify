import { AccessTokenPayload, ITokenService } from "../../application/services/IToken.service";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/app.error";
import { authMessage } from "../../shared/constants/messages/authMessages";
import { statusCode } from "../../shared/constants/statusCode";
import { TokenExpiredError } from "jsonwebtoken";



export function authHandler(_tokenService: ITokenService) {
    

    return async(req: Request, res: Response, next: NextFunction) => {
        console.log('From auth middleware...')
        let authHeader = req.headers.authorization
        if(!authHeader){
            throw new AppError(authMessage.error.UNAUTHORIZED, statusCode.UNAUTHORIZED)
        }

        const token = authHeader.split(' ')[1]
        if(!token){
            throw new AppError(authMessage.error.UNAUTHORIZED, statusCode.UNAUTHORIZED)
        }

        try {
            const isBlackListed = await _tokenService.isTokenBlackListed(token)
            if(isBlackListed) {
                throw new AppError(authMessage.error.UNAUTHORIZED, statusCode.UNAUTHORIZED)
            }

            const user: AccessTokenPayload = _tokenService.verifyAccessToken(token)
            req.user = user
            console.log('decoded user ', user)
            next()

        } catch (error) {
            if(error instanceof TokenExpiredError){
                throw new AppError(authMessage.error.ACCESS_TOKEN_EXPIRED, statusCode.UNAUTHORIZED)
            }else{
                throw new AppError(authMessage.error.UNAUTHORIZED, statusCode.UNAUTHORIZED)
            }
        }
    }
}