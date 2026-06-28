import { UserShortUrlInputDTO, UserShortUrlOutputDTO } from "../../dtos/url/user.urlShort.dto";

export interface IUserShortUrlUsecase {
    execute(request: UserShortUrlInputDTO): Promise<UserShortUrlOutputDTO>
}