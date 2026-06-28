import { UrlEntity } from "../../../domain/entities/Url.entity";
import { AppError } from "../../../domain/errors/app.error";
import { ICounterRepository } from "../../../domain/repositoryInterfaces/iCounter.repository";
import { IUrlRepository } from "../../../domain/repositoryInterfaces/iUrl.repository";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { env } from "../../../infrastructure/config/env.config";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { encodeBase62 } from "../../../utils/base64";
import { UserShortUrlInputDTO, UserShortUrlOutputDTO } from "../../dtos/url/user.urlShort.dto";
import { IUserShortUrlUsecase } from "../../interfaces/url/IUser.shortUrl.usecase";

export class UserShortUrlUsecase implements IUserShortUrlUsecase {
    constructor (
        private _urlRepository: IUrlRepository,
        private _userRepository :IUserRepository,
        private _counterRepository: ICounterRepository
    ) {}

    async execute(request: UserShortUrlInputDTO): Promise<UserShortUrlOutputDTO> {
        const user = await this._userRepository.findById(request.userId)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.NOT_FOUND)
        }
        const count = await this._counterRepository.findAndIncrement('Url')
        const shortCode = encodeBase62(count)
        console.log('short code: ', shortCode)
        const newUrl = new UrlEntity(
            '',
            user.id,
            request.url,
            shortCode
        )

        console.log('from usecase ', newUrl)
        await this._urlRepository.create(newUrl)

        const shortUrl = `${env.BACKEND_URL}/api/v1/${shortCode}`

        return {
            shortUrl
        }

    }
}