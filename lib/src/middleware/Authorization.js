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
exports.authorize = void 0;
// import jwt from 'jsonwebtoken';
const node_path_1 = __importDefault(require("node:path"));
const dBPath = node_path_1.default.resolve(__dirname, "../authorAndBook.db");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dBPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        return console.log(err);
});
function authorize(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.user || !req.user.AuthorId) {
                return res.status(401).json({ message: 'Unauthorized - User not authenticated' });
            }
            const requestedAuthorId = parseInt(req.params.authorId, 10);
            if (req.user.AuthorId !== requestedAuthorId) {
                return res.status(403).json({ message: 'Forbidden - User does not have permission' });
            }
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    });
}
exports.authorize = authorize;
