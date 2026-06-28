import { UrlMapper } from "../../application/mappers/url.mapper";
import { UrlEntity } from "../../domain/entities/Url.entity";
import { IUrlRepository } from "../../domain/repositoryInterfaces/iUrl.repository";
import { IUrl, urlModel } from "../models/Url";
import { BaseRepository } from "./Base.repository";

export class UrlRepository extends BaseRepository<UrlEntity, IUrl> implements IUrlRepository {
    constructor(){
        super(urlModel)
    }

    async findByCode(code: string): Promise<UrlEntity | null> {
        const document = await this._model.findOne({shortCode: code})
        if(!document) return null
        return this.mapToEntity(document)
    }

    async updateClicks(id: string): Promise<UrlEntity | null> {
        return await this._model.findByIdAndUpdate(
            id,
            {$inc: { clicks: 1 } },
            { new: true }
        )
    }

    protected mapToEntity(doc: IUrl): UrlEntity {
        return UrlMapper.mapToEntity(doc)
    }

    protected mapToPersistance(entity: UrlEntity): Partial<IUrl> {
        return UrlMapper.mapToPersistance(entity)
    }
}