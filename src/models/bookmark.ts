import mongoose, { mongo } from 'mongoose'

interface IBookmark {
    post: mongoose.Schema.Types.ObjectId
    user: mongoose.Schema.Types.ObjectId
}

const bookmarkSchema = new mongoose.Schema<IBookmark>({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Bookmark = mongoose.model<IBookmark>('Bookmark', bookmarkSchema)

export { Bookmark as default }