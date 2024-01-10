// // import createError from "http-errors";
// // import express, { Request, Response, NextFunction } from "express";
// // import getAllAuthorController from "../controller/getAllUser";
// // // import signupController from '../controller/signup';
// // import loginController from '../controller/login'

// // // implementation start here
// // const router = express.Router();


// // GET all users route
// router.post("/", register);

// // Creating new user
// // router.post("/signup", signupController);

// // new user login
// router.post("/login", loginController);

// export default router;

import express, { Router } from "express";
import { checkIfUserHasAccount } from "../controller/signup";

const router = express.Router()

router.post("/", checkIfUserHasAccount);

export default router


