import express, { Request, Response, NextFunction } from "express";
import path from "node:path";

const sqlite3 = require("sqlite3").verbose();
const dBPath = path.resolve(__dirname, "../authorAndBook.db");
const db = new sqlite3.Database(
  dBPath,
  sqlite3.OPEN_READWRITE,
  (err: any) => {
    if (err) return console.log(err);
  }
);

export default function (req: Request, res: Response, next: NextFunction) {
    const sql = `SELECT * FROM Users`;
  
    db.all(sql, function (err: Error, users: any[]) {
      if (err) {
        console.error("Error in database operation:", err);
        return res.status(500).json({
          status: 500,
          success: false,
          error: err.message, // Provide the error message for better debugging
        });
      }
      else{
        console.log("All users detail gotten");
        return res.send(JSON.stringify(users, null, 2));
    }
    });
  };