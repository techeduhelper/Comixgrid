import { comparePassword, hassPassword } from "../helpers/authHelpers.js";
import userModels from "../models/userModels.js";
import JWT from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, pin, answer } = req.body
        // for validations use
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'Email is required' })
        }
        if (!password) {
            return res.send({ message: 'Password is required' })
        }
        if (!phone) {
            return res.send({ message: 'Phone is required' })
        }
        if (!address) {
            return res.send({ message: 'Address is required' })
        }
        if (!pin) {
            return res.send({ message: 'Pin is required' })
        }
        if (!answer) {
            return res.send({ message: 'Answer is required' })
        }
        // check user
        const existingUser = await userModels.findOne({ email })
        // existing user
        if (existingUser) {
            return res.status(200).send({
                status: 'false',
                message: 'Already register please login'
            })
        }
        console.log("register checking", req.body)
        // resgister user
        const hashedPassword = await hassPassword(password)
        //save
        const user = await new userModels({ name, email, phone, address, pin, answer, password: hashedPassword, }).save()
        res.status(201).send({
            success: true,
            message: 'User registered succesfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal server error",
            error
        })
    }
};

export default registerController;


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation 
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email and password"
            })
        }
        // checking user
        const user = await userModels.findOne({ email });
        if (!user) {
            throw new Error("Email not found")
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            res.status(200).send({
                success: false,
                message: "Incorrect Password!"
            })
        }
        // token creating
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).send({
            success: true,
            message: "Loged in Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Login in error",
            error
        })
    }
}

export const forgetPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            return res.status(401).json({ "message": "Email is required" })
        }
        if (!answer) {
            return res.status(401).json({ "message": "answer is required" })
        }
        if (!newPassword) {
            return res.status(401).json({ "message": "New Password is required" })
        }

        // check user
        const user = await userModels.findOne({ email, answer })

        // validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found!"
            })
        }

        const hashed = await hassPassword(newPassword)
        await userModels.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Forget password failed!",
            error
        })
    }
}

// test controller
export const testController = (req, res) => {
    res.send("test controller working fine!!!")
}