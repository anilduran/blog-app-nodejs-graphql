import mongoose from 'mongoose'


interface ICategory {
    name: string
    description: string
}

const categorySchema = new mongoose.Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
})
 
const Category = mongoose.model<ICategory>('Category', categorySchema)

export { Category as default }