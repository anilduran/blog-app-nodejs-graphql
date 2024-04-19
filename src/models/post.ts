import mongoose from 'mongoose'

interface IPost {
    title: string
    description: string
    content: string
    imageUrl: string
    isVisible: boolean
    deletedAt: Date
    author: mongoose.Types.ObjectId
    categories: Array<mongoose.Types.ObjectId>
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
}, {
    timestamps: true
})

const Post = mongoose.model<IPost>('Post', postSchema)

export { Post as default }