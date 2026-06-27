import { UserLoginInputDTO, UserLoginOutputDTO } from "../../dtos/auth/user.login.dto";

export interface IUserLoginUsecase {
    execute(request: UserLoginInputDTO): Promise<UserLoginOutputDTO>
}