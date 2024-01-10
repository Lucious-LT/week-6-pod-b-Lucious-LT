"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuthenticate_1 = require("../middleware/jwtAuthenticate");
// import { getBookFunction, createNewBook, getBooksBySingleAuthor, updateBookFunction, deleteBookFunction } from "../controller/bookController";
// implementation start here
const router = express_1.default.Router();
/* GET BOOKSS listing. */
router.get("/", getBookFunction);
router.get("/:id", getBooksBySingleAuthor);
// creating a new books
router.post("/", jwtAuthenticate_1.authenticate, createNewBook);
// updating a book
router.put("/", jwtAuthenticate_1.authenticate, updateBookFunction);
// deleting a book
router.delete("/", jwtAuthenticate_1.authenticate, deleteBookFunction);
exports.default = router;
