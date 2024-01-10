import {Response, NextFunction } from "express";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { Auth } from "../model/auth";
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../../express';

// Zod to validate
const userSchema = z.object({
  email: z.string({
    required_error: "email needs to be provided",
    invalid_type_error: "email needs to be a string",
  }).email(),
  password: z.string({
    required_error: "password needs to be provided",
    invalid_type_error: "password needs to be a string",
  }).min(6, "password must be at least 6 characters")
});

const strictNewUserSchema = userSchema.strict();

export default async function handleUserLogin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const validation = strictNewUserSchema.parse(req.body);
    const { email, password } = validation;
    const checkIfEmailExist = await Auth.findOne({ email });

    if (!checkIfEmailExist) {
      return res.status(401).json({
        message: `User with ${email} does not exist, kindly sign up`,
        statusCode: 401
      });
    } else {
      const confirmPassword = await bcrypt.compare(password, checkIfEmailExist.password);
      if (!confirmPassword) {
        return res.status(401).json({
          message: `Incorrect password`,
          statusCode: 401
        });
      }

      const token = jwt.sign({ authorId: checkIfEmailExist._id }, 'your-secret-key', { expiresIn: '1h' });

      res.header('Authorization', `Bearer ${token}`);
      req.user = email; // Attach the user to the request for further use
      res.status(200).json({
        message: `User with Email: ${email} is logged in!`,
        token: token
      });
    }

  } catch (error) {
    res.status(400).json({ message: error });
  }
}