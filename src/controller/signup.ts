
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import bcrypt from 'bcrypt';
import { signup } from "../model/auth";


// new user schema
const newUserSchema = z.object({
  username: z
    .string({
      required_error: "fullname needs to be provided",
      invalid_type_error: "fullname needs to be a string",
    })
    .trim()
    .min(2, "fullname need to have a min length of 2")
    .max(50, "fullname need to have a max length of 50"),
  email: z.string({
    required_error: "email needs to be provided",
    invalid_type_error: "email needs to be a string",
  }).email(),
  
  password: z.string({
    required_error: "password needs to be provided",
    invalid_type_error: "pass needs to be a string",
  }).min(6, "password must be at least 6 characters")
});
const strictNewUserSchema = newUserSchema.strict()

export async function checkIfUserHasAccount(req: Request, res: Response, next: NextFunction){
  try {
    const validation = strictNewUserSchema.parse(req.body);
    const {username, email, password } = validation;
    const existingEmail = await signup.findOne({email})
    if(existingEmail && existingEmail.email === email){
      return res.status(401).json({
        message: `User with ${email} already exist kindly login`,
        "statusCode": 401
      })
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await signup.create({
        username,
        email,
        password: hashedPassword,
      })
      res.status(201).json({
        message: `User with Email: ${email} successfully! signup`,
      })
    }

    

   
 } catch (error) {
  console.log("error", error)
 }
}
