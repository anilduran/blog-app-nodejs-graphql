import mongoose from "mongoose";

interface IReadingList {
    name: string
    description: string
    imageUrl: string
    creator: mongoose.Schema.Types.ObjectId
    posts: Array<mongoose.Schema.Types.ObjectId>
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}


const readingListSchema = new mongoose.Schema<IReadingList>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    deletedAt: {
        type: Date
    }
})

const ReadingList = mongoose.model<IReadingList>('ReadingList', readingListSchema)

export { ReadingList as default}