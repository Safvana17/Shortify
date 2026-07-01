import { UrlEntity } from "../../../domain/entities/Url.entity";
import { AppError } from "../../../domain/errors/app.error";
import { IUrlRepository } from "../../../domain/repositoryInterfaces/iUrl.repository";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { env } from "../../../infrastructure/config/env.config";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserShortUrlInputDTO, UserShortUrlOutputDTO } from "../../dtos/url/user.urlShort.dto";
import { IUserShortUrlUsecase } from "../../interfaces/url/IUser.shortUrl.usecase";
import { IUrlService } from "../../services/IUrl.service";

export class UserShortUrlUsecase implements IUserShortUrlUsecase {
    constructor (
        private _urlRepository: IUrlRepository,
        private _userRepository :IUserRepository,
        private _urlService: IUrlService
    ) {}

    async execute(request: UserShortUrlInputDTO): Promise<UserShortUrlOutputDTO> {
        const user = await this._userRepository.findById(request.userId)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.NOT_FOUND)
        }
        let exists
        let shortCode = ''
        do{
           shortCode = await this._urlService.generateCode()
           exists = await this._urlRepository.findByCode(shortCode)
        }while(exists)

        console.log('short code: ', shortCode)
        const newUrl = new UrlEntity(
            '',
            user.id,
            request.url,
            shortCode
        )

        console.log('from usecase ', newUrl)
        await this._urlRepository.create(newUrl)

        const shortUrl = `${env.BASE_URL}/${shortCode}`

        return {
            shortUrl
        }

    }
}