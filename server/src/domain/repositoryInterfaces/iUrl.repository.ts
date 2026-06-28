import { UrlEntity } from "../entities/Url.entity";

export interface IUrlRepository {
    findByCode(code: string): Promise<UrlEntity | null>
}