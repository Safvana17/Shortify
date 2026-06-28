import { CounterEntity } from "../../domain/entities/Counter.entity";
import { ICounter } from "../../infrastructure/models/Counter";

export class CounterMapper {
    static mapToEntity(doc: ICounter): CounterEntity {
        const counter = new CounterEntity (
            doc._id.toString(),
            doc.name,
            doc.seq
        )

        return counter 
    }

    static mapToPersistance(entity: CounterEntity){
        return {
            name: entity.name,
            seq: entity.seq
        }
    }
}