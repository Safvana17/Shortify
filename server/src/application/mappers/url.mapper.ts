import { Types } from "mongoose";
import { UrlEntity } from "../../domain/entities/Url.entity";
import { IUrl } from "../../infrastructure/models/Url";

export class UrlMapper {
    static mapToEntity(doc: IUrl): UrlEntity {
        const url = new UrlEntity(
            doc._id.toString(),
            doc.userId.toString(),
            doc.originalUrl,
            doc.shortCode
        )

        url.clicks = doc.clicks

        return url
    }

    static mapToPersistance(entity: UrlEntity){
        return {
            userId: entity.userId ? new Types.ObjectId(entity.userId) : undefined,
            originalUrl: entity.originalUrl,
            shortCode: entity.shortCode,
            clicks: entity.clicks
        }
    }
}