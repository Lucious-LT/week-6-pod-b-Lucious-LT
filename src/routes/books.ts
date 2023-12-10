
import express from "express";
import { authenticate } from "../middleware/jwtAuthenticate";
import { getBookFunction, createNewBook, getBooksBySingleAuthor, updateBookFunction, deleteBookFunction } from "../controller/bookController";

// implementation start here
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

/* GET BOOKSS listing. */
router.get("/", getBookFunction);
router.get("/:id", getBooksBySingleAuthor);
// creating a new books
router.post("/", authenticate, createNewBook);
// updating a book
router.put("/", authenticate, updateBookFunction);
// deleting a book
router.delete("/", authenticate, deleteBookFunction);
export default router;
