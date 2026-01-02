"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../Controllers/userController");
const authMiddleware_1 = __importDefault(require("../Middleware/authMiddleware"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Register User
router.post("/create", userController_1.registerUser);
// login user
router.post("/login", userController_1.loginUser);
router.use(authMiddleware_1.default);
router.post("/add", userController_1.addItemToCloset);
exports.default = router;
