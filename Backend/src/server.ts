import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/configDB"
import userRoutes from "./Routes/userRoutes"
dotenv.config()

const app = express()
app.use(express.json())
app.use("/api/user", userRoutes)
const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server Runing on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Error While Connecting to Server", error)
    }
}

startServer()