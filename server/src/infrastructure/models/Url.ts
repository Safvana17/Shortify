import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUrl extends Document {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    originalUrl: string
    shortCode: string
    clicks: number
}

const urlSchema: Schema<IUrl> = new Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortCode: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User'
    },
    clicks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

export const urlModel: Model<IUrl> = mongoose.model('Url', urlSchema)