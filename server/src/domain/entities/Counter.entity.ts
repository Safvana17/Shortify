export class CounterEntity {
    id: string
    name: string
    seq: number
    constructor (
        id: string,
        name: string = 'Url',
        seq: number = 0
    ) {
        this.id = id
        this.name = name
        this.seq = seq
    }
}