import { UserGetUrlInputDTO, UserGetUrlOutputDTO } from "../../dtos/url/user.getUrl.dto";

export interface IUserGetUrlUsecase {
    execute(request: UserGetUrlInputDTO): Promise<UserGetUrlOutputDTO>
}