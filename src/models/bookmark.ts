import mongoose, { mongo } from 'mongoose'

const bookmarkSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

export { Bookmark as default }