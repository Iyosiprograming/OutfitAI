"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const configDB_1 = __importDefault(require("./Config/configDB"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Body parsers
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve uploaded images
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Routes
app.use("/api/user", userRoutes_1.default);
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await (0, configDB_1.default)();
        app.listen(PORT, () => {
            console.log(`Server Running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log("Error While Connecting to Server", error);
    }
};
startServer();
