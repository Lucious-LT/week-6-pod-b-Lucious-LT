"use strict";
// import express, { Request, Response, NextFunction } from "express";
// import { ZodError, z } from "zod";
// import { AuthenticatedRequest } from "../../express";
// import path from 'node:path';
// import url from 'node:url';
// import query from 'node:querystring';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createNewBook = exports.getBooksBySingleAuthor = exports.getAllBooks = void 0;
const books_1 = require("../model/books");
const zod_1 = require("zod");
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allBooks = yield books_1.Book.find();
            res.status(200).json({
                message: allBooks
            });
        }
        catch (error) {
            res.status(500).json({
                message: (error)
            });
        }
    });
}
exports.getAllBooks = getAllBooks;
function getBooksBySingleAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const books = yield books_1.Book.find({ author: zod_1.any });
            res.status(200).json({
                message: books,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.getBooksBySingleAuthor = getBooksBySingleAuthor;
;
function createNewBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, author } = req.body;
        try {
            const newBook = yield books_1.Book.create({ title, author });
            res.status(201).json({
                message: 'Book created successfully',
                book: newBook,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.createNewBook = createNewBook;
;
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { title, author } = req.body;
        try {
            const updatedBook = yield books_1.Book.findByIdAndUpdate(id, { title, author }, { new: true } // Return the updated document
            );
            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({
                message: 'Book updated successfully',
                book: updatedBook,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.updateBook = updateBook;
;
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deletedBook = yield books_1.Book.findByIdAndDelete(id);
            if (!deletedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.status(200).json({
                message: 'Book deleted successfully',
                book: deletedBook,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    });
}
exports.deleteBook = deleteBook;
;
