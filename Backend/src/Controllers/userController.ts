import User from "../Models/userModel"
import bcrypt from "bcrypt"
import { Request, Response } from "express"
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