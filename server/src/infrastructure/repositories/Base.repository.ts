import { Model, Types } from "mongoose";
import { IBaseRepository } from "../../domain/repositoryInterfaces/iBase.Repository";

export abstract class BaseRepository<
T extends { id: string },
D extends { _id: Types.ObjectId }
> implements IBaseRepository<T> {

    constructor (
        protected _model: Model<D>
    ) {}

    async create(entity: T): Promise<T> {
        const data = this.mapToPersistance(entity)
        const document = await this._model.create(data)
        return this.mapToEntity(document)
    }

    async findById(id: string): Promise<T | null> {
        const document = await this._model.findById(id)
        if(!document) return null
        return this.mapToEntity(document)
    }

    async update(id: string, entity: T): Promise<T | null> {
        const data = this.mapToPersistance(entity)
        const document = await this._model.findByIdAndUpdate(
            id, 
            { $set: data },
            { new: true }
        )
        if(!document) return null
        return this.mapToEntity(document)
    }

    protected abstract mapToEntity(doc: D): T
    protected abstract mapToPersistance(entity: T): Partial<D>
}