import mongoose from 'mongoose'

export const genObjectId = () => {
    return new mongoose.Types.ObjectId()
}