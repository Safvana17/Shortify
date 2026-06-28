import { AppError } from "../../../domain/errors/app.error";
import { IUrlRepository } from "../../../domain/repositoryInterfaces/iUrl.repository";
import { env } from "../../../infrastructure/config/env.config";
import { urlMessages } from "../../../shared/constants/messages/urlMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserGetUrlInputDTO, UserGetUrlOutputDTO } from "../../dtos/url/user.getUrl.dto";
import { IUserGetUrlUsecase } from "../../interfaces/url/IUser.getUrl.usecase";

export class UserGetUrlUsecase implements IUserGetUrlUsecase {
    constructor(
        private _urlRepository: IUrlRepository
    ) {}

    async execute(request: UserGetUrlInputDTO): Promise<UserGetUrlOutputDTO> {
        const url = await this._urlRepository.findByCode(request.shortCode)
        if(!url){
            throw new AppError(urlMessages.error.URL_NOT_FOUND, statusCode.NOT_FOUND)
        }
        await this._urlRepository.updateClicks(url.id)
        const link = url.originalUrl
        return {
            link
        }
    }
}