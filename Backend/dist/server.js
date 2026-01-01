"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const configDB_1 = __importDefault(require("./Config/configDB"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await (0, configDB_1.default)();
        app.listen(PORT, () => {
            console.log("Server Runing on http://localhost" + PORT);
        });
    }
    catch (error) {
        console.log("Error While Connecting to Server", error);
    }
};
startServer();
