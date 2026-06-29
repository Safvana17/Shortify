import { UserEntity } from "../entities/User.entity";
import { IBaseRepository } from "./iBase.Repository";

export interface IUserRepository extends IBaseRepository<UserEntity> {
   findByEmail(email: string): Promise<UserEntity | null>
   updateToken(id: string, token: string): Promise<void>
   revokeRefreshToken(hashedToken: string): Promise<void>
}