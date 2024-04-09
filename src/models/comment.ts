import mongoose from 'mongoose'

interface IComment {
    content: string
    createdAt: Date
    updatedAt: Date
    user: mongoose.Schema.Types.ObjectId
    post: mongoose.Schema.Types.ObjectId
}


const commentSchema = new mongoose.Schema<IComment>({
    content: {
        type: String,
        required: true
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
})

const Comment = mongoose.model<IComment>('Comment', commentSchema)

export { Comment as default }