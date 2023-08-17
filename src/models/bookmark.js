import mongoose, { mongo } from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Bookmark = mongoose.Schema('Bookmark', bookmarkSchema)

export { Bookmark as default }