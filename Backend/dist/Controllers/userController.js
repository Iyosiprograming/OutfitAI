"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const user = await userModel_1.default.create({
            email,
            password: hashedPassword
        });
        return res.status(201).json({ message: "User Created Successfully", user });
    }
    catch (error) {
        console.log("Error While Registering User", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.registerUser = registerUser;
