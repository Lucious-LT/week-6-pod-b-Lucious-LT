import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import getAllAuthorController from "../controller/getAllUser";
import signupController from '../controller/signup';
import loginController from '../controller/login'

// implementation start here
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// GET all users route
router.get("/", getAllAuthorController);

// Creating new user
router.post("/signup", signupController);

// new user login
router.post("/login", loginController);

export default router;