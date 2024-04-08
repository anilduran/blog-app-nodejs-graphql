import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePhotoUrl: {
        type: String,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
})

const User = mongoose.model('User', userSchema)

export { User as default }