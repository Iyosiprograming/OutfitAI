import { registerUser } from "../Controllers/userController";
import express from "express";

const router = express.Router()

// Register User

router.post("/create", registerUser)

export default router