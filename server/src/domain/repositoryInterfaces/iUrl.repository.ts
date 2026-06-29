import { UrlDTO } from "../../application/dtos/url/user.getAllUrl.dto";
import { IUrl } from "../../infrastructure/models/Url";
import { UrlEntity } from "../entities/Url.entity";
import { IBaseRepository } from "./iBase.Repository";


export interface IUrlRepository extends IBaseRepository<UrlEntity>{
    findByCode(code: string): Promise<UrlEntity | null>
    updateClicks(id: string): Promise<UrlEntity | null>
    findAllFiltered(query: { userId: string, page: number, limit: number}): Promise<{data: UrlDTO[]; totalCount: number; totalPages: number}>
    
}