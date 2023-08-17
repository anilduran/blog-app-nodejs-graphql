import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})
 
const Category = mongoose.model('Category', categorySchema)

export { Category as default }