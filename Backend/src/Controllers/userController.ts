import User from "../Models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

const JWT_SECRET = process.env.JWT_SECRET as string

// Register User
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" })
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        const user = await User.create({
            email,
            password: hashedPassword
        })
        return res.status(201).json({ message: "User Created Successfully", user })
    } catch (error) {
        console.log("Error While Registering User", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

// login user

export const loginUser = async (req:Request, res:Response) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const isPasswordValid = bcrypt.compareSync(password, existingUser.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" })
        return res.status(200).json({ message: "Login Successful", token })
    } catch (error) {
        
    }
}