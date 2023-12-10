import express, { Request, Response, NextFunction } from "express";
import { ZodError, z } from "zod";
import { AuthenticatedRequest } from "../../express";
import path from 'node:path';
import url from 'node:url';
import query from 'node:querystring';


// my database
const sqlite3 = require("sqlite3").verbose();
const dBPath = path.resolve(__dirname, "../authorAndBook.db");
const db = new sqlite3.Database(
  dBPath,
  sqlite3.OPEN_READWRITE,
  (err: any) => {
    if (err) return console.log("why", err);
  }
);


/* GET Books listing. */

export function getBookFunction(req: Request, res: Response, next: NextFunction) {
  try {
    const sql = `SELECT * FROM Books`;

    db.all(sql, function (err: Error, books: any[]) {
      if (err) {
        console.error("Error in database operation:", err);
        return err
      }
      console.log("All users detail gotten");
      res.json({
        message: books
      });
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }

}

// get a single book
export async function getBooksBySingleAuthor(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = url.parse(req.url as string, true);

    if (!query) {
      return res.status(401).json({
        message: `No query found`
      })
    }
    else {
      const sql = `SELECT * FROM Books WHERE BookId = ?`;
      const singleBook = await new Promise((resolve, reject) => {
        db.all(sql, [query], (err: Error, books: any[]) => {
          if (err) {
            reject(err)
          }
          resolve(books);
        });
      })
      res.status(201).json({
        message: singleBook
      });
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
// zod to validate new input
const booksObjectSchema = z.object({
  Title: z
    .string({
      required_error: "title needs to be provided",
      invalid_type_error: "title needs to be a string",
    })
    .trim()
    .min(2, "Title need to have a min length of 2")
    .max(200, "title need to have a max length of 200"),
  datePublished: z.string().trim(),
  Description: z.string(),
  pageCount: z.number().int(),
  Genre: z.string().trim(),
  Publisher: z.string().trim(),

});
const strictBookObjectSchema = booksObjectSchema.strict()

// new books control
export const createNewBook = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const validation = strictBookObjectSchema.parse(req.body);
    const { Title, datePublished, Description, pageCount, Genre, Publisher } = validation;
    const authorId = req.user?.AuthorId
    const sql = `INSERT INTO Books (
    Title, 
    DatePublished, 
    Description, 
    PageCount,
    Genre,
    Publisher,
    AuthorId
    ) 
    VALUES (?,?,?,?,?,?,?)`;
    const createNewBook = await new Promise((resolve, reject) => {
      db.run(sql, [Title, datePublished, Description, pageCount, Genre, Publisher, authorId], (err: Error, books: any) => {
        if (err) {
          reject(err)
        }
        resolve(`New book added successfully`);
      });
    })
    res.status(201).json({
      message: createNewBook
    });
  }
  catch (error: any) {
    if (error instanceof ZodError) {
      res.status(401).json({
        message: error
      })
    }
    else if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
      return res.status(403).json({
        message: "Title already exist, kindly use another title"
      })
    }
  }
}
// update books control

const updateBooksObjectSchema = z.object({
  Title: z
    .string({
      required_error: "title needs to be provided",
      invalid_type_error: "title needs to be a string",
    })
    .trim()
    .min(2, "Title need to have a min length of 2")
    .max(200, "title need to have a max length of 200"),
  datePublished: z.string().trim(),
  Description: z.string(),
  pageCount: z.number().int(),
  Genre: z.string().trim(),
  Publisher: z.string().trim(),

});
const strictUpdateBookObjectSchema = updateBooksObjectSchema.strict()

export const updateBookFunction = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const validation = strictUpdateBookObjectSchema.parse(req.body);
    const { Title, datePublished, Description, pageCount, Genre, Publisher } = validation;
    const authorId = req.user?.AuthorId
    const { query } = url.parse(req.url as string, true);
    if (!query.id) {
      return res.status(401).json({
        message: `kindly supply id of book to update`
      })
    }
    else {
      const sql = `UPDATE Books 
    SET 
      Title = ?, 
      DatePublished = ?, 
      Description = ?, 
      PageCount = ?, 
      Genre = ?, 
      Publisher = ?, 
      AuthorId = ? 
    WHERE 
      BookId = ${query.id}`;
      const updateBook = await new Promise((resolve, reject) => {
        db.run(sql, [Title, datePublished, Description, pageCount, Genre, Publisher, authorId], (err: Error) => {
          if (err) {
            reject(err)
          }
          resolve(`book with id ${query.id} updated successfully`);
        });
      })
      res.status(201).json({
        message: updateBook
      });
    }
  }
  catch (error: any) {
    if (error instanceof ZodError) {
      res.status(401).json({
        message: error
      })
    }
    else if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
      return res.status(403).json({
        message: "Title already exist, kindly use another title"
      })
    }
  }
}
export const deleteBookFunction = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const validation = strictUpdateBookObjectSchema.parse(req.body);
    const { Title, datePublished, Description, pageCount, Genre, Publisher } = validation;
    const authorId = req.user?.AuthorId
    const { query } = url.parse(req.url as string, true);
    if (!query.id) {
      return res.status(401).json({
        message: `kindly supply id of book to delete`
      })
    }
    else {
      const sql = `DELETE FROM Books WHERE BookId = ${query.id}`;
      const deleteBook = await new Promise((resolve, reject) => {
        db.run(sql, (err: Error) => {
          if (err) {
            reject(err)
          }
          resolve(`book with id ${query.id} deleted successfully`);
        });
      })
      res.status(201).json({
        message: deleteBook
      });
    }
  }
  catch (error: any) {
    if (error instanceof ZodError) {
      res.status(401).json({
        message: error
      })
    }
    else if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
      return res.status(403).json({
        message: "Title already exist, kindly use another title"
      })
    }
  }
}