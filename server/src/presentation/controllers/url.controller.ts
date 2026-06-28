import { IUserShortUrlUsecase } from "../../application/interfaces/url/IUser.shortUrl.usecase";
import { asyncHandler } from "../http/asyncHandler";
import { Request, Response  } from "express";
import { sendSuccess } from "../http/response";
import { statusCode } from "../../shared/constants/statusCode";


export class UrlController {
    constructor (
        private _shortUrlUsecase: IUserShortUrlUsecase
    ) {}

    shortUrl = asyncHandler( async (req: Request, res: Response) => {
        const userId = req.user?.id
        const { shortUrl }= await this._shortUrlUsecase.execute({userId: userId!, url: req.body.url})
        return sendSuccess(res, statusCode.OK, '', shortUrl )
    })
}