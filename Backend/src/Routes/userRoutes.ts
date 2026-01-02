import { registerUser , loginUser, addItemToCloset} from "../Controllers/userController";
import authMiddleware from "../Middleware/authMiddleware";
import express from "express";

const router = express.Router()

// Register User

router.post("/create", registerUser)

// login user
router.post("/login", loginUser)
router.use(authMiddleware)
router.post("/add", addItemToCloset)

export default router