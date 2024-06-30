import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Products name is required'] },
    price: { type: Number, required: [true, 'Product price is required'] },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4 },
    createdAt: { type: Date, default: Date.now() },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE}'
        }
    }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)