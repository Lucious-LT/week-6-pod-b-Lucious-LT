import express, { Request, Response, NextFunction } from "express";
import exp from "node:constants";
import path from "node:path";

async function getAllBooks(req: Request, res: Response, next: NextFunction) {
  try {
    res.render("index", { title: "Express" });
  } catch (error) {
    next(error);
  }
}


 export default getAllBooks;
