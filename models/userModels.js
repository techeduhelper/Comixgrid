import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    answer: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true,
    },
    role: {
        type: Number,
        default: 0,// 1=admin, 0=user
    }
}, { timestamps: true })


export default mongoose.model('users', userSchema)