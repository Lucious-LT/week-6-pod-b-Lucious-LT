import createError from "http-errors";
import express, { Request as ExpressRequest, Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";
import bcrypt from 'bcrypt';
import path from "node:path";

const dBPath = path.resolve(__dirname, "../authorAndBook.db");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  dBPath,
  sqlite3.OPEN_READWRITE,
  (err: any) => {
    if (err) return console.log(err);
  }
);

// new user schema
const newUserSchema = z.object({
  AuthorName: z
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
  phoneNumber: z.string().max(14,"phone number must be 14 characters"),
  password: z.string({
    required_error: "password needs to be provided",
    invalid_type_error: "pass needs to be a string",
  }).min(6, "password must be at least 6 characters")
});
const strictNewUserSchema = newUserSchema.strict()

export default async function checkIfUserHasAccount(req: Request, res: Response, next: NextFunction){
  try {
    const validation = strictNewUserSchema.parse(req.body);
    const { AuthorName, email, phoneNumber, password } = validation;
    // Check for duplicate email
    const sql = `SELECT Email FROM Author`;
    const selectEmailFromDatabase: Record<string, string>[] = await new Promise((resolve, reject) => {
      db.all(sql, (err: Error, users: any[]) => {
        resolve(users);
      });
    });

    const checkDuplicateemail = selectEmailFromDatabase.find((element: Record<string, string>) => element.Email === email);
    // checking if the email already exists
    if (checkDuplicateemail) {
      return res.status(401).json({
          message: `User with ${email} already exist kindly login`,
          
    });
  }

    else{
       // Encrypt password
       const hashedPassword = await bcrypt.hash(password, 10);

       // Store the new user
       const insertSql = `INSERT INTO Author (
         AuthorName, 
         Email, 
         Phone_no, 
         Password
         ) 
         VALUES (?,?,?,?)`;
   
      const signUpNewUSer =  await new Promise((resolve, reject) => {
          db.run(
            insertSql,
            [AuthorName, email, phoneNumber, hashedPassword],
            (err: Error) => {
              if (err) {
                reject(err);
              }
              resolve("New user created successfully");
            }
          );
        })
        res.status(201).json({
          message: signUpNewUSer
        })  
      }
   
 } catch (error) {
    if(error instanceof ZodError){
        res.status(401).json({
            message: error
        })
    }
    else{
      return res.status(403).json({
        error: error
      })
    }
  }
};

