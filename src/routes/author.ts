import express, { Request, Response } from 'express';
import { authenticate } from '../middleware/jwtAuthenticate';
import { getAllBooks, getBooksBySingleAuthor, createNewBook, updateBook, deleteBook } from '../controller/bookController';

const router = express.Router();



// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));

router.get('/', authenticate, getAllBooks);
router.get('/author/:author', authenticate, getBooksBySingleAuthor);
// // creating a new books
router.post("/", authenticate, createNewBook);
// // updating a book
router.put('/:id', authenticate, updateBook);
// // deleting a book
router.delete("/", authenticate, deleteBook);

module.exports=router;
