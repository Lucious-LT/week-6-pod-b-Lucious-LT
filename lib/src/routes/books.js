"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtAuthenticate_1 = require("../middleware/jwtAuthenticate");
const bookController_1 = require("../controller/bookController");
// implementation start here
const router = express_1.default.Router();
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: false }));
/* GET BOOKSS listing. */
router.get("/", bookController_1.getBookFunction);
router.get("/:id", bookController_1.getBooksBySingleAuthor);
// creating a new books
router.post("/", jwtAuthenticate_1.authenticate, bookController_1.createNewBook);
// updating a book
router.put("/", jwtAuthenticate_1.authenticate, bookController_1.updateBookFunction);
// deleting a book
router.delete("/", jwtAuthenticate_1.authenticate, bookController_1.deleteBookFunction);
exports.default = router;
