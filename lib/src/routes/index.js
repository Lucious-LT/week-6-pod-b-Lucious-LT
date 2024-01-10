"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const signup_1 = __importDefault(require("./signup"));
// Middleware
// app.use(express.json());
// Connect to MongoDB if MONGODB_URI is defined
const app = (0, express_1.default)();
if (process.env.MONGODB_URI) {
    const options = { useUnifiedTopology: true };
    mongoose_1.default.connect(process.env.MONGODB_URI)
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });
}
// Load routes
app.use('/api/books', signup_1.default);
// Start the server
