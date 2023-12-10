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
const node_path_1 = __importDefault(require("node:path"));
const dBPath = node_path_1.default.resolve(__dirname, "../authorAndBook.db");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dBPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        return console.log(err);
});
// new user schema
const newUserSchema = zod_1.z.object({
    AuthorName: zod_1.z
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
    phoneNumber: zod_1.z.string().max(14, "phone number must be 14 characters"),
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
            const { AuthorName, email, phoneNumber, password } = validation;
            // Check for duplicate email
            const sql = `SELECT Email FROM Author`;
            const selectEmailFromDatabase = yield new Promise((resolve, reject) => {
                db.all(sql, (err, users) => {
                    resolve(users);
                });
            });
            const checkDuplicateemail = selectEmailFromDatabase.find((element) => element.Email === email);
            // checking if the email already exists
            if (checkDuplicateemail) {
                return res.status(401).json({
                    message: `User with ${email} already exist kindly login`,
                });
            }
            else {
                // Encrypt password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                // Store the new user
                const insertSql = `INSERT INTO Author (
         AuthorName, 
         Email, 
         Phone_no, 
         Password
         ) 
         VALUES (?,?,?,?)`;
                const signUpNewUSer = yield new Promise((resolve, reject) => {
                    db.run(insertSql, [AuthorName, email, phoneNumber, hashedPassword], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve("New user created successfully");
                    });
                });
                res.status(201).json({
                    message: signUpNewUSer
                });
            }
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                res.status(401).json({
                    message: error
                });
            }
            else {
                return res.status(403).json({
                    error: error
                });
            }
        }
    });
}
exports.default = checkIfUserHasAccount;
;
