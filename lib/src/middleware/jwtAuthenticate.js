"use strict";
// import { AuthenticatedRequest } from '../../express'; 
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import path from 'node:path';
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
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../model/auth"); // Adjust the import based on your actual model location
function authenticate(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, 'your-secret-key');
            // Find the user in MongoDB based on the decoded authorId
            const user = yield auth_1.Auth.findOne({ _id: decoded.authorId });
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // Attach user information to the request for further use
            req.user = user._id.toString();
            console.log(req.user);
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Unauthorized' });
        }
    });
}
exports.authenticate = authenticate;
