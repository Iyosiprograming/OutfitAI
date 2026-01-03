"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemToCloset = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../Models/userModel"));
const closetModel_1 = __importDefault(require("../Models/closetModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
// ---------------- Register User ----------------
const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists" });
        }
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const user = await userModel_1.default.create({ email, password: hashedPassword });
        await closetModel_1.default.create({
            userId: user._id,
            clothes: []
        });
        res.status(201).json({ message: "User Created Successfully", user });
    }
    catch (error) {
        console.log("Error While Registering User", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.registerUser = registerUser;
// ---------------- Login User ----------------
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userModel_1.default.findOne({ email });
        if (!existingUser)
            return res.status(404).json({ message: "User Not Found" });
        const isPasswordValid = bcrypt_1.default.compareSync(password, existingUser.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid Credentials" });
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login Successful", token });
    }
    catch (error) {
        console.log('Eroor While Login User', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.loginUser = loginUser;
// ---------------- Add Item to Closet ----------------
const addItemToCloset = async (req, res) => {
    try {
        const userId = req.user._id;
        const { type, name, color, quantity } = req.body;
        if (!type || !name || !color) {
            return res.status(400).json({ message: "`type`, `name`, and `color` are required" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Item image is required" });
        }
        const imageData = {
            name: req.file.filename,
            url: `/uploads/${req.file.filename}`, // relative URL
        };
        const closet = await closetModel_1.default.findOne({ userId });
        if (!closet)
            return res.status(404).json({ message: "Closet not found" });
        const item = closet.clothes.find(c => c.type === type && c.name === name && c.color === color);
        if (item) {
            item.quantity += quantity ? Number(quantity) : 1;
            item.image = imageData; // optional: update image
        }
        else {
            closet.clothes.push({
                type,
                name,
                color,
                quantity: quantity ? Number(quantity) : 1,
                image: imageData,
            });
        }
        await closet.save();
        res.status(200).json(closet);
    }
    catch (err) {
        console.error("Error adding item to closet:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.addItemToCloset = addItemToCloset;
