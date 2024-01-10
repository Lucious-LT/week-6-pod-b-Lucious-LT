"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("../controller/login"));
const router = express_1.default.Router();
// Route for user login
router.post('/login', login_1.default);
// Add more routes as needed
exports.default = router;
