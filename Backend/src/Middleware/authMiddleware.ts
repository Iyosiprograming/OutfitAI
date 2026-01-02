import jwt from "jsonwebtoken"
import User from "../Models/userModel"

const JWT_SECRET = process.env.JWT_SECRET || "afklfjkafjkajfklfkl"

const authMiddleware = async (req: any, res: any, next: any) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, JWT_SECRET) as any

        const user = await User.findById(decoded.id)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }

        req.user = user

        next()
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

export default authMiddleware
