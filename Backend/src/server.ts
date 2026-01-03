import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/configDB"
import userRoutes from "./Routes/userRoutes"
import path from "path"

dotenv.config()

const app = express()

// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

// Routes
app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server Running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Error While Connecting to Server", error)
    }
}

startServer()
