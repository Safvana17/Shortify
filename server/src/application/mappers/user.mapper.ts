import { UserEntity } from "../../domain/entities/User.entity";
import { IUser } from "../../infrastructure/models/User";

export class UserMapper {
    static mapToEntity(doc: IUser): UserEntity {
        const user = new UserEntity(
            doc._id.toString(),
            doc.name,
            doc.email,
            doc.password,
            doc.isVerified,
            doc.refreshToken ?? []
        )

        return user
    }

    static mapToPersistance(entity: UserEntity){
        return {
            name: entity.name,
            email: entity.email,
            password: entity.password,
            isVerified: entity.isVerified,
            refreshToken: entity.refreshToken
        }
    }
}