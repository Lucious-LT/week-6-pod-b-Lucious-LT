"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../model/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Zod to validate
const userSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "email needs to be provided",
        invalid_type_error: "email needs to be a string",
    }).email(),
    password: zod_1.z.string({
        required_error: "password needs to be provided",
        invalid_type_error: "password needs to be a string",
    }).min(6, "password must be at least 6 characters")
});
const strictNewUserSchema = userSchema.strict();
function handleUserLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validation = strictNewUserSchema.parse(req.body);
            const { email, password } = validation;
            const checkIfEmailExist = yield auth_1.Auth.findOne({ email });
            if (!checkIfEmailExist) {
                return res.status(401).json({
                    message: `User with ${email} does not exist, kindly sign up`,
                    statusCode: 401
                });
            }
            else {
                const confirmPassword = yield bcrypt_1.default.compare(password, checkIfEmailExist.password);
                if (!confirmPassword) {
                    return res.status(401).json({
                        message: `Incorrect password`,
                        statusCode: 401
                    });
                }
                const token = jsonwebtoken_1.default.sign({ authorId: checkIfEmailExist._id }, 'your-secret-key', { expiresIn: '1h' });
                res.header('Authorization', `Bearer ${token}`);
                req.user = email; // Attach the user to the request for further use
                res.status(200).json({
                    message: `User with Email: ${email} is logged in!`,
                    token: token
                });
            }
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    });
}
exports.default = handleUserLogin;
