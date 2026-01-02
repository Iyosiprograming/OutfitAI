import { registerUser , loginUser} from "../Controllers/userController";
import express from "express";

const router = express.Router()

// Register User

router.post("/create", registerUser)

// login user
router.post("/login", loginUser)

export default router