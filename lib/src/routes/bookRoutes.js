"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuthenticate_1 = require("../middleware/jwtAuthenticate");
const bookController_1 = require("../controller/bookController");
const signup_1 = __importDefault(require("./signup"));
signup_1.default.use(express_1.default.json());
signup_1.default.use(express_1.default.urlencoded({ extended: false }));
signup_1.default.get('/', jwtAuthenticate_1.authenticate, bookController_1.getAllBooks);
signup_1.default.get('/author/:author', jwtAuthenticate_1.authenticate, bookController_1.getBooksBySingleAuthor);
// // creating a new books
signup_1.default.post("/", jwtAuthenticate_1.authenticate, bookController_1.createNewBook);
// // updating a book
signup_1.default.put('/:id', jwtAuthenticate_1.authenticate, bookController_1.updateBook);
// // deleting a book
signup_1.default.delete("/", jwtAuthenticate_1.authenticate, bookController_1.deleteBook);
module.exports = signup_1.default;
