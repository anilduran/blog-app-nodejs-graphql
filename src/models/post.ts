import mongoose from 'mongoose'

interface IPost {
    title: string
    description: string
    content: string
    imageUrl: string
    isVisible: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    author: mongoose.Schema.Types.ObjectId
    categories: Array<mongoose.Schema.Types.ObjectId>
}

const postSchema = new mongoose.Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true,
        default: true
    },
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
        type: Date,
        required: false
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    ]
})

const Post = mongoose.model<IPost>('Post', postSchema)

export { Post as default }