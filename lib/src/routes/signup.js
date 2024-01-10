"use strict";
// // import createError from "http-errors";
// // import express, { Request, Response, NextFunction } from "express";
// // import getAllAuthorController from "../controller/getAllUser";
// // // import signupController from '../controller/signup';
// // import loginController from '../controller/login'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // // implementation start here
// // const router = express.Router();
// // GET all users route
// router.post("/", register);
// // Creating new user
// // router.post("/signup", signupController);
// // new user login
// router.post("/login", loginController);
// export default router;
const express_1 = __importDefault(require("express"));
const signup_1 = require("../controller/signup");
const router = express_1.default.Router();
router.post("/", signup_1.checkIfUserHasAccount);
exports.default = router;
