"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../Controllers/userController");
const upload_1 = require("../Middleware/upload");
const authMiddleware_1 = __importDefault(require("../Middleware/authMiddleware"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Register User
router.post("/create", userController_1.registerUser);
// Login User
router.post("/login", userController_1.loginUser);
// Protect routes after this middleware
router.use(authMiddleware_1.default);
// Add item to closet with image upload
// "image" is the field name in the form-data
router.post("/add", upload_1.upload.single("image"), userController_1.addItemToCloset);
exports.default = router;
