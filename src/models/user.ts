import mongoose from 'mongoose'

interface IUser {
    username: string
    email: string
    password: string
    profilePhotoUrl: string
    isActive: Boolean
}

const userSchema = new mongoose.Schema<IUser>({
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

const User = mongoose.model<IUser>('User', userSchema)

export { User as default }