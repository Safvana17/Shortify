import { UserRefreshTokenInputDTO, UserRefreshTokenOutputDTO } from "../../dtos/auth/user.refreshToken.dto";

export interface IUserRefreshTokenUsecase {
    execute(request: UserRefreshTokenInputDTO): Promise<UserRefreshTokenOutputDTO>
}