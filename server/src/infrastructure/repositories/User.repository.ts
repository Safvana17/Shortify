import { UserMapper } from "../../application/mappers/user.mapper";
import { UserEntity } from "../../domain/entities/User.entity";
import { IUserRepository } from "../../domain/repositoryInterfaces/iUser.repository";
import { IUser, userModel } from "../models/User";
import { BaseRepository } from "./Base.repository";

export class UserRepository extends BaseRepository<UserEntity, IUser> implements IUserRepository {
    constructor(){
        super(userModel)
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const document = await this._model.findOne({email})
        if(!document) return null
        return this.mapToEntity(document)
    }

    async updateToken(id: string, token: string): Promise<void> {
        await this._model.findByIdAndUpdate(
            id,
            { $push: {
                refreshToken: token
            }}
        )
    }

    protected mapToEntity(doc: IUser): UserEntity {
        return UserMapper.mapToEntity(doc)
    }

    protected mapToPersistance(entity: UserEntity): Partial<IUser> {
        return UserMapper.mapToPersistance(entity)
    }
}