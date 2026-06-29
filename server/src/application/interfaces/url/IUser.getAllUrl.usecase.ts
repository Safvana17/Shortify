import { UserGetAllUrlInputDTO, UserGetAllUrlOutputDTO } from "../../dtos/url/user.getAllUrl.dto";

export interface IUserGetAllUrlUsecase {
    execute(request: UserGetAllUrlInputDTO): Promise<UserGetAllUrlOutputDTO>
}