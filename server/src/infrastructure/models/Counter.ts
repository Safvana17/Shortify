import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICounter extends Document {
    name: string
    seq: number
}

const counterSchema: Schema<ICounter> = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    seq: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export const counterModel: Model<ICounter> = mongoose.model('Counter', counterSchema)