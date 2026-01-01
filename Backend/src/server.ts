import express from "express"
import dotenv from "dotenv"
import connectDB from "./Config/configDB"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log("Server Runing on http://localhost" + PORT)
        })
    } catch (error) {
        console.log("Error While Connecting to Server", error)
    }
}

startServer()