import JWT from 'jsonwebtoken';
import userModels from '../models/userModels.js';

// protected routes using JWT

export const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
    }
}


export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModels.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'You are not authorized to perform this action'
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
}