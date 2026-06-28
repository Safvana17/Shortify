import { IUrl } from "../../infrastructure/models/Url";
import { UrlEntity } from "../entities/Url.entity";
import { IBaseRepository } from "./iBase.Repository";

export interface IUrlRepository extends IBaseRepository<UrlEntity>{
    findByCode(code: string): Promise<UrlEntity | null>
    updateClicks(id: string): Promise<UrlEntity | null>
}