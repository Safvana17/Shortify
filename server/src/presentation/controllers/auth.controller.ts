import { IUserRegisterUsecase } from "../../application/interfaces/auth/IUser.register.usecase";
import { asyncHandler } from "../http/asyncHandler";
import { Request, Response } from "express";
import { sendSuccess } from "../http/response";
import { statusCode } from "../../shared/constants/statusCode";
import { authMessage } from "../../shared/constants/messages/authMessages";
import { IUserVerifyOtpUsecase } from "../../application/interfaces/auth/IUser.verifyOtp.usecase";
import { IUserResendOtpUsecase } from "../../application/interfaces/auth/IUser.resendOtp.usecase";
import { IUserLoginUsecase } from "../../application/interfaces/auth/IUser.login.usecase";
import { env } from "../../infrastructure/config/env.config";
import { IUserRefreshTokenUsecase } from "../../application/interfaces/auth/IUser.refreshToken.usecase";
import { IUserLogoutUsecase } from "../../application/interfaces/auth/IUser.logout.usecase";
export class AuthController {
    constructor (
        private _userRegisterUsecase: IUserRegisterUsecase,
        private _userVerifyOtpUsecase: IUserVerifyOtpUsecase,
        private _userResendOtpUsecase: IUserResendOtpUsecase,
        private _userLoginUsecase: IUserLoginUsecase,
        private _userRefreshTokenUsecase: IUserRefreshTokenUsecase,
        private _userLogoutUsecase: IUserLogoutUsecase,
    ) {}

    register = asyncHandler( async (req: Request, res: Response) => {
        await this._userRegisterUsecase.execute(req.body)
        return sendSuccess(res, statusCode.OK, authMessage.success.USER_REGISTERED_SUCCESSFULLY,)
    })

    verifyOtp = asyncHandler( async (req: Request, res: Response) => {
        await this._userVerifyOtpUsecase.execute(req.body)
        return sendSuccess(res, statusCode.OK, '')
    })

    resendOtp = asyncHandler ( async (req: Request, res: Response) => {
        await this._userResendOtpUsecase.execute(req.body)
        return sendSuccess(res, statusCode.OK, '')
    })

    login = asyncHandler ( async (req: Request, res: Response) => {
        const { user, refreshToken, accessToken } = await this._userLoginUsecase.execute(req.body)
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: env.REFRESH_TOKEN_MAX_AGE,
            path: '/'
        })

        return sendSuccess(res, statusCode.OK, authMessage.success.USER_LOGGED_IN_SUCCESSFULLY, { user, accessToken})
    })

    refreshToken = asyncHandler ( async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken
        console.log('refresh token: ', refreshToken)

        const data = await this._userRefreshTokenUsecase.execute({token: refreshToken})

        res.cookie('refreshToken', data.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: env.REFRESH_TOKEN_MAX_AGE,
            path: '/'
        })

        return sendSuccess(res, statusCode.OK, '', {user: data.user, accessToken: data.accessToken})
    })

    logout = asyncHandler( async (req: Request, res: Response) => {
        const accessToken = req.headers.authorization?.split(' ')[1]
        const refreshToken = req.cookies.refreshToken
        await this._userLogoutUsecase.execute(refreshToken, accessToken!)
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        })
        console.log('User logged out')
        return sendSuccess(res, statusCode.OK, '')
    })
}