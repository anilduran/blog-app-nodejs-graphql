import mongoose from 'mongoose'

interface IComment {
    content: string
    user: mongoose.Types.ObjectId
    post: mongoose.Types.ObjectId
}

const commentSchema = new mongoose.Schema<IComment>({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
}, {
    timestamps: true
})

const Comment = mongoose.model<IComment>('Comment', commentSchema)

export { Comment as default }