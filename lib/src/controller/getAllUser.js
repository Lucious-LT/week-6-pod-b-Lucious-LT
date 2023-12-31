"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const sqlite3 = require("sqlite3").verbose();
const dBPath = node_path_1.default.resolve(__dirname, "../authorAndBook.db");
const db = new sqlite3.Database(dBPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        return console.log(err);
});
function default_1(req, res, next) {
    const sql = `SELECT * FROM Users`;
    db.all(sql, function (err, users) {
        if (err) {
            console.error("Error in database operation:", err);
            return res.status(500).json({
                status: 500,
                success: false,
                error: err.message, // Provide the error message for better debugging
            });
        }
        else {
            console.log("All users detail gotten");
            return res.send(JSON.stringify(users, null, 2));
        }
    });
}
exports.default = default_1;
;
