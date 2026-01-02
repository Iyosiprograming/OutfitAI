import User from "../Models/userModel"
import Closet from "../Models/closetModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"

const JWT_SECRET = process.env.JWT_SECRET as string

// ---------------- Register User ----------------
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const user = await User.create({ email, password: hashedPassword })

    // create empty closet for this user
    await Closet.create({
      userId: user._id,
      clothes: [] // empty array prevents validation errors
    })

    res.status(201).json({ message: "User Created Successfully", user })
  } catch (error) {
    console.log("Error While Registering User", error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// ---------------- Login User ----------------
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (!existingUser) return res.status(404).json({ message: "User Not Found" })

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credentials" })

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" })
    res.status(200).json({ message: "Login Successful", token })
  } catch (error) {
    console.log('Eroor While Login User', error)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

// ---------------- Add Item to Closet ----------------
export const addItemToCloset = async (req: Request, res: Response) => {
  try {
    // 👇 TypeScript doesn't know req.user exists, so use "any"
    const userId = (req as any).user._id

    const { type, color, quantity } = req.body

    // validate input
    if (!type || !color) {
      return res.status(400).json({ message: "`type` and `color` are required" })
    }

    const closet = await Closet.findOne({ userId })
    if (!closet) return res.status(404).json({ message: "Closet not found" })

    // check if same item exists → increment quantity
    const item = closet.clothes.find(c => c.type === type && c.color === color)
    if (item) {
      item.quantity += quantity || 1
    } else {
      closet.clothes.push({ type, color, quantity: quantity || 1 })
    }

    await closet.save()
    res.status(200).json(closet)
  } catch (err) {
    console.log("Error While Adding Item to Closet", err)
    res.status(500).json({ message: "Server Error" })
  }
}
