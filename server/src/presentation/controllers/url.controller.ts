import { IUserShortUrlUsecase } from "../../application/interfaces/url/IUser.shortUrl.usecase";
import { asyncHandler } from "../http/asyncHandler";
import { Request, Response  } from "express";
import { sendSuccess } from "../http/response";
import { statusCode } from "../../shared/constants/statusCode";
import { IUserGetUrlUsecase } from "../../application/interfaces/url/IUser.getUrl.usecase";
import { UrlParams, UrlQuery } from "../validators/user.url.validator";
import { IUserGetAllUrlUsecase } from "../../application/interfaces/url/IUser.getAllUrl.usecase";


export class UrlController {
    constructor (
        private _shortUrlUsecase: IUserShortUrlUsecase,
        private _getLinkUsecase: IUserGetUrlUsecase,
        private _getAllLinksUsecase: IUserGetAllUrlUsecase
    ) {}

    shortUrl = asyncHandler( async (req: Request, res: Response) => {
        const userId = req.user?.id
        const { shortUrl }= await this._shortUrlUsecase.execute({userId: userId!, url: req.body.url})
        return sendSuccess(res, statusCode.OK, '', shortUrl )
    })

    getLink = asyncHandler ( async (req: Request, res: Response) => {
        const { shortCode } = req.validatedParams as UrlParams
        console.log("Redirect called:", req.params.shortCode);
        const { link } = await this._getLinkUsecase.execute({shortCode})
        return sendSuccess(res, statusCode.OK, '', link)
    })

    getAllLinks = asyncHandler ( async (req: Request, res: Response) => {
        const userId = req.user?.id
        const query = req.validatedQuery as UrlQuery
        const { totalCount, totalPages, urls } = await this._getAllLinksUsecase.execute({userId: userId!, ...query})
        return sendSuccess(res, statusCode.OK, '', { urls, totalCount, totalPages})
    })
}