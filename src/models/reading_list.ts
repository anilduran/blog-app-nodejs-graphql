import mongoose from "mongoose";

interface IReadingList {
    name: string
    description: string
    imageUrl: string
    creator: mongoose.Types.ObjectId
    posts: Array<mongoose.Types.ObjectId>
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
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
})

const ReadingList = mongoose.model<IReadingList>('ReadingList', readingListSchema)

export { ReadingList as default}