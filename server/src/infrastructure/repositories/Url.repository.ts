import { QueryFilter } from "mongoose";
import { UrlDTO } from "../../application/dtos/url/user.getAllUrl.dto";
import { UrlMapper } from "../../application/mappers/url.mapper";
import { UrlEntity } from "../../domain/entities/Url.entity";
import { IUrlRepository } from "../../domain/repositoryInterfaces/iUrl.repository";
import { IUrl, urlModel } from "../models/Url";
import { BaseRepository } from "./Base.repository";
import { env } from "../config/env.config";

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

    async findAllFiltered(query: { userId: string; page: number; limit: number; }): Promise<{ data: UrlDTO[]; totalCount: number; totalPages: number; }> {
        const filter: QueryFilter<IUrl> = {
            userId: query.userId
        }

        const skip = query.limit * ( query.page - 1 )
        const totalCount = await this._model.countDocuments(filter)
        const totalPages = Math.ceil(totalCount/ query.limit)

        const documents = await this._model
           .find(filter)
           .sort({ createdAt: -1})
           .skip(skip)
           .limit(query.limit)

        return {
            data: documents.map((d) =>({
                id: d._id.toString(),
                shortLink: `${env.BASE_URL}/${d.shortCode}`,
                originalLink: d.originalUrl,
                clicks: d.clicks,
                createdOn: d.createdAt.toISOString()
            })),
            totalCount,
            totalPages
        }
    }

    protected mapToEntity(doc: IUrl): UrlEntity {
        return UrlMapper.mapToEntity(doc)
    }

    protected mapToPersistance(entity: UrlEntity): Partial<IUrl> {
        return UrlMapper.mapToPersistance(entity)
    }
}