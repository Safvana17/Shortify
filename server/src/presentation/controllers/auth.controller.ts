import { IUserRegisterUsecase } from "../../application/interfaces/auth/IUser.register.usecase";
import { asyncHandler } from "../http/asyncHandler";
import { Request, Response } from "express";
import { sendSuccess } from "../http/response";
import { statusCode } from "../../shared/constants/statusCode";
import { authMessage } from "../../shared/constants/messages/authMessages";
import { IUserVerifyOtpUsecase } from "../../application/interfaces/auth/IUser.verifyOtp.usecase";
export class AuthController {
    constructor (
        private _userRegisterUsecase: IUserRegisterUsecase,
        private _userVerifyOtpUsecase: IUserVerifyOtpUsecase,
    ) {}

    register = asyncHandler( async (req: Request, res: Response) => {
        await this._userRegisterUsecase.execute(req.body)
        return sendSuccess(res, statusCode.OK, authMessage.success.USER_REGISTERED_SUCCESSFULLY,)
    })

    verifyOtp = asyncHandler( async (req: Request, res: Response) => {
        await this._userVerifyOtpUsecase.execute(req.body)
        return sendSuccess(res, statusCode.OK, '')
    })
}