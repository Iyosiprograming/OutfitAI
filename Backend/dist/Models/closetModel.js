"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const closetSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    clothes: [
        {
            type: {
                type: String,
                enum: [
                    "shoe",
                    "top",
                    "pant",
                    "hat",
                    "shade",
                    "watch",
                    "bag",
                    "socks",
                    "underwear",
                    "scarf"
                ],
                required: true
            },
            color: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1
            }
        }
    ]
}, { timestamps: true });
exports.default = mongoose_1.default.model("Closet", closetSchema);
