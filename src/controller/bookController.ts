// import express, { Request, Response, NextFunction } from "express";
// import { ZodError, z } from "zod";
// import { AuthenticatedRequest } from "../../express";
// import path from 'node:path';
// import url from 'node:url';
// import query from 'node:querystring';


import { NextFunction, Request, Response } from "express";
import { Book } from "../model/books";
import { any } from "zod";

export async function getAllBooks(req: Request, res: Response) {
    try {
        const allBooks = await Book.find();
        res.status(200).json({
            message: allBooks
        });
    } catch (error) {
        res.status(500).json({
            message: (error)
        });
    }
}


export async function getBooksBySingleAuthor(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    try {
        const books = await Book.find({ author: any });
        res.status(200).json({
          message: books,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: 'Internal Server Error',
        });
      }
    };
   export async function createNewBook(req:any, res:any) {
        const { title, author } = req.body;
      
        try {
          const newBook = await Book.create({ title, author });
          res.status(201).json({
            message: 'Book created successfully',
            book: newBook,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        }
      };
     export async function  updateBook (req:any, res:any)  {
        const { id } = req.params;
        const { title, author } = req.body;
      
        try {
          const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author },
            { new: true } // Return the updated document
          );
      
          if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
          }
      
          res.status(200).json({
            message: 'Book updated successfully',
            book: updatedBook,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        }
      };
      export async function deleteBook (req:any, res:any)  {
        const { id } = req.params;
      
        try {
          const deletedBook = await Book.findByIdAndDelete(id);
      
          if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
          }
      
          res.status(200).json({
            message: 'Book deleted successfully',
            book: deletedBook,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: 'Internal Server Error',
          });
        }
      };

  


