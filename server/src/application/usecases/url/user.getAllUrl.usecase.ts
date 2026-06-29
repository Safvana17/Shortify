import { AppError } from "../../../domain/errors/app.error";
import { IUrlRepository } from "../../../domain/repositoryInterfaces/iUrl.repository";
import { IUserRepository } from "../../../domain/repositoryInterfaces/iUser.repository";
import { authMessage } from "../../../shared/constants/messages/authMessages";
import { statusCode } from "../../../shared/constants/statusCode";
import { UserGetAllUrlInputDTO, UserGetAllUrlOutputDTO } from "../../dtos/url/user.getAllUrl.dto";
import { IUserGetAllUrlUsecase } from "../../interfaces/url/IUser.getAllUrl.usecase";

export class UserGetAllUrlUsecase implements IUserGetAllUrlUsecase {
    constructor (
        private _userRepository: IUserRepository,
        private _urlRepository: IUrlRepository
    ) {}

    async execute(request: UserGetAllUrlInputDTO): Promise<UserGetAllUrlOutputDTO> {
        const user = await this._userRepository.findById(request.userId)
        if(!user){
            throw new AppError(authMessage.error.USER_NOT_FOUND, statusCode.NOT_FOUND)
        }

        const { data, totalCount, totalPages } = await this._urlRepository.findAllFiltered({userId: request.userId, page: request.page, limit: request.limit})

        return {
            urls: data,
            totalCount,
            totalPages
        }
    }
}