import { IUserShortUrlUsecase } from "../../application/interfaces/url/IUser.shortUrl.usecase";
import { asyncHandler } from "../http/asyncHandler";
import { Request, Response  } from "express";
import { sendSuccess } from "../http/response";
import { statusCode } from "../../shared/constants/statusCode";
import { IUserGetUrlUsecase } from "../../application/interfaces/url/IUser.getUrl.usecase";
import { UrlParams } from "../validators/user.url.validator";


export class UrlController {
    constructor (
        private _shortUrlUsecase: IUserShortUrlUsecase,
        private _getLinkUsecase: IUserGetUrlUsecase,
    ) {}

    shortUrl = asyncHandler( async (req: Request, res: Response) => {
        const userId = req.user?.id
        const { shortUrl }= await this._shortUrlUsecase.execute({userId: userId!, url: req.body.url})
        return sendSuccess(res, statusCode.OK, '', shortUrl )
    })

    getLink = asyncHandler ( async (req: Request, res: Response) => {
        const { shortCode } = req.validatedParams as UrlParams
        const { link } = await this._getLinkUsecase.execute({shortCode})
        console.log('from controller: ', link)
        res.redirect(link)
    })
}