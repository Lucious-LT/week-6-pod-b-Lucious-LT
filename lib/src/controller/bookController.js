"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookFunction = exports.updateBookFunction = exports.createNewBook = exports.getBooksBySingleAuthor = exports.getBookFunction = void 0;
const zod_1 = require("zod");
const node_path_1 = __importDefault(require("node:path"));
const node_url_1 = __importDefault(require("node:url"));
// my database
const sqlite3 = require("sqlite3").verbose();
const dBPath = node_path_1.default.resolve(__dirname, "../authorAndBook.db");
const db = new sqlite3.Database(dBPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        return console.log("why", err);
});
/* GET Books listing. */
function getBookFunction(req, res, next) {
    try {
        const sql = `SELECT * FROM Books`;
        db.all(sql, function (err, books) {
            if (err) {
                console.error("Error in database operation:", err);
                return err;
            }
            console.log("All users detail gotten");
            res.json({
                message: books
            });
        });
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}
exports.getBookFunction = getBookFunction;
// get a single book
function getBooksBySingleAuthor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { query } = node_url_1.default.parse(req.url, true);
            if (!query) {
                return res.status(401).json({
                    message: `No query found`
                });
            }
            else {
                const sql = `SELECT * FROM Books WHERE BookId = ?`;
                const singleBook = yield new Promise((resolve, reject) => {
                    db.all(sql, [query], (err, books) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(books);
                    });
                });
                res.status(201).json({
                    message: singleBook
                });
            }
        }
        catch (error) {
            res.status(500).send('Internal Server Error');
        }
    });
}
exports.getBooksBySingleAuthor = getBooksBySingleAuthor;
// zod to validate new input
const booksObjectSchema = zod_1.z.object({
    Title: zod_1.z
        .string({
        required_error: "title needs to be provided",
        invalid_type_error: "title needs to be a string",
    })
        .trim()
        .min(2, "Title need to have a min length of 2")
        .max(200, "title need to have a max length of 200"),
    datePublished: zod_1.z.string().trim(),
    Description: zod_1.z.string(),
    pageCount: zod_1.z.number().int(),
    Genre: zod_1.z.string().trim(),
    Publisher: zod_1.z.string().trim(),
});
const strictBookObjectSchema = booksObjectSchema.strict();
// new books control
const createNewBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const validation = strictBookObjectSchema.parse(req.body);
        const { Title, datePublished, Description, pageCount, Genre, Publisher } = validation;
        const authorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.AuthorId;
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
        const createNewBook = yield new Promise((resolve, reject) => {
            db.run(sql, [Title, datePublished, Description, pageCount, Genre, Publisher, authorId], (err, books) => {
                if (err) {
                    reject(err);
                }
                resolve(`New book added successfully`);
            });
        });
        res.status(201).json({
            message: createNewBook
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(401).json({
                message: error
            });
        }
        else if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
            return res.status(403).json({
                message: "Title already exist, kindly use another title"
            });
        }
    }
});
exports.createNewBook = createNewBook;
// update books control
const updateBooksObjectSchema = zod_1.z.object({
    Title: zod_1.z
        .string({
        required_error: "title needs to be provided",
        invalid_type_error: "title needs to be a string",
    })
        .trim()
        .min(2, "Title need to have a min length of 2")
        .max(200, "title need to have a max length of 200"),
    datePublished: zod_1.z.string().trim(),
    Description: zod_1.z.string(),
    pageCount: zod_1.z.number().int(),
    Genre: zod_1.z.string().trim(),
    Publisher: zod_1.z.string().trim(),
});
const strictUpdateBookObjectSchema = updateBooksObjectSchema.strict();
const updateBookFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const validation = strictUpdateBookObjectSchema.parse(req.body);
        const { Title, datePublished, Description, pageCount, Genre, Publisher } = validation;
        const authorId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.AuthorId;
        const { query } = node_url_1.default.parse(req.url, true);
        if (!query.id) {
            return res.status(401).json({
                message: `kindly supply id of book to update`
            });
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
            const updateBook = yield new Promise((resolve, reject) => {
                db.run(sql, [Title, datePublished, Description, pageCount, Genre, Publisher, authorId], (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(`book with id ${query.id} updated successfully`);
                });
            });
            res.status(201).json({
                message: updateBook
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(401).json({
                message: error
            });
        }
        else if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
            return res.status(403).json({
                message: "Title already exist, kindly use another title"
            });
        }
    }
});
exports.updateBookFunction = updateBookFunction;
const deleteBookFunction = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const validation = strictUpdateBookObjectSchema.parse(req.body);
        const { Title, datePublished, Description, pageCount, Genre, Publisher } = validation;
        const authorId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.AuthorId;
        const { query } = node_url_1.default.parse(req.url, true);
        if (!query.id) {
            return res.status(401).json({
                message: `kindly supply id of book to delete`
            });
        }
        else {
            const sql = `DELETE FROM Books WHERE BookId = ${query.id}`;
            const deleteBook = yield new Promise((resolve, reject) => {
                db.run(sql, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(`book with id ${query.id} deleted successfully`);
                });
            });
            res.status(201).json({
                message: deleteBook
            });
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(401).json({
                message: error
            });
        }
        else if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
            return res.status(403).json({
                message: "Title already exist, kindly use another title"
            });
        }
    }
});
exports.deleteBookFunction = deleteBookFunction;
