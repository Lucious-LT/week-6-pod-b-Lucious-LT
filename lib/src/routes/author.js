"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuthenticate_1 = require("../middleware/jwtAuthenticate");
const bookController_1 = require("../controller/bookController");
const router = express_1.default.Router();
// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));
router.get('/', jwtAuthenticate_1.authenticate, bookController_1.getAllBooks);
router.get('/author/:author', jwtAuthenticate_1.authenticate, bookController_1.getBooksBySingleAuthor);
// // creating a new books
router.post("/", jwtAuthenticate_1.authenticate, bookController_1.createNewBook);
// // updating a book
router.put('/:id', jwtAuthenticate_1.authenticate, bookController_1.updateBook);
// // deleting a book
router.delete("/", jwtAuthenticate_1.authenticate, bookController_1.deleteBook);
module.exports = router;
