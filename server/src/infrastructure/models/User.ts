import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IUser extends Document {
    _id: Types.ObjectId,
    name: string
    email: string
    password: string
    isVerified: boolean
    refreshToken: string[]
}

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
})

export const userModel: Model<IUser> = mongoose.model('User', userSchema)