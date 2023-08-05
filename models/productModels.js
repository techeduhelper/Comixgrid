import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        require: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: String,
    }


}, { timestamps: true })

export default mongoose.model('products', productSchema);