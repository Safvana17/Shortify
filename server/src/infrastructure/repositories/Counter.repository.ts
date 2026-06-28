import { CounterMapper } from "../../application/mappers/counter.mapper";
import { CounterEntity } from "../../domain/entities/Counter.entity";
import { ICounterRepository } from "../../domain/repositoryInterfaces/iCounter.repository";
import { counterModel, ICounter } from "../models/Counter";
import { BaseRepository } from "./Base.repository";


export class CounterRepository extends BaseRepository<CounterEntity, ICounter> implements ICounterRepository {
    constructor(){
        super(counterModel)
    }

    async findAndIncrement(name: string): Promise<number> {
        const document = await this._model.findOneAndUpdate(
            { name },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )

        return document.seq
    }

    protected mapToEntity(doc: ICounter): CounterEntity {
        return CounterMapper.mapToEntity(doc)
    }

    protected mapToPersistance(entity: CounterEntity): Partial<ICounter> {
        return CounterMapper.mapToPersistance(entity)
    }
}