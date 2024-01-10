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
exports.checkIfUserHasAccount = void 0;
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../model/auth");
// new user schema
const newUserSchema = zod_1.z.object({
    username: zod_1.z
        .string({
        required_error: "fullname needs to be provided",
        invalid_type_error: "fullname needs to be a string",
    })
        .trim()
        .min(2, "fullname need to have a min length of 2")
        .max(50, "fullname need to have a max length of 50"),
    email: zod_1.z.string({
        required_error: "email needs to be provided",
        invalid_type_error: "email needs to be a string",
    }).email(),
    password: zod_1.z.string({
        required_error: "password needs to be provided",
        invalid_type_error: "pass needs to be a string",
    }).min(6, "password must be at least 6 characters")
});
const strictNewUserSchema = newUserSchema.strict();
function checkIfUserHasAccount(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validation = strictNewUserSchema.parse(req.body);
            const { username, email, password } = validation;
            const existingEmail = yield auth_1.signup.findOne({ email });
            if (existingEmail && existingEmail.email === email) {
                return res.status(401).json({
                    message: `User with ${email} already exist kindly login`,
                    "statusCode": 401
                });
            }
            else {
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const user = yield auth_1.signup.create({
                    username,
                    email,
                    password: hashedPassword,
                });
                res.status(201).json({
                    message: `User with Email: ${email} successfully! signup`,
                });
            }
        }
        catch (error) {
            console.log("error", error);
        }
    });
}
exports.checkIfUserHasAccount = checkIfUserHasAccount;
