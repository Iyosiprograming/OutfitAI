import { registerUser, loginUser, addItemToCloset } from "../Controllers/userController";
import { upload } from "../Middleware/upload";
import authMiddleware from "../Middleware/authMiddleware";
import express from "express";

const router = express.Router();

// Register User
router.post("/create", registerUser);

// Login User
router.post("/login", loginUser);

// Protect routes after this middleware
router.use(authMiddleware);

// Add item to closet with image upload
// "image" is the field name in the form-data
router.post("/add", upload.single("image"), addItemToCloset);

export default router;
