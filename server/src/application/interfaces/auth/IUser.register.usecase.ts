import { UserRegisterInputDTO, UserRegisterOutputDTO } from "../../dtos/auth/user.register.dto";

export interface IUserRegisterUsecase {
    execute(request: UserRegisterInputDTO): Promise<UserRegisterOutputDTO>
}