import { CounterEntity } from "../entities/Counter.entity";
import { IBaseRepository } from "./iBase.Repository";

export interface ICounterRepository extends IBaseRepository<CounterEntity>{
    findAndIncrement(name: string): Promise<number>
}