import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI as string)
        console.log("Database Connected Sucessfully")
    } catch (error) {
        console.log("Error While connecting DB", error)
        process.exit(1)
    }
}

export default connectDB
