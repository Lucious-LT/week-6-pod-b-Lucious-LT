import { AuthenticatedRequest } from '../../express'; 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import path from 'node:path';


const dBPath = path.resolve(__dirname, "../authorAndBook.db");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  dBPath,
  sqlite3.OPEN_READWRITE,
  (err: any) => {
    if (err) return console.log(err);
  }
);

async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction){
  // @ts-ignore
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // const token = req.query.token as string;

  if (!token) {
    return res.status(401).json({ message: 'get Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key') as { authorId: number };
    const queryAuthor = `SELECT AuthorId FROM Author WHERE AuthorId = ?`; 
    const authorIdFromDatabase:Record<string, number> = {}
    const selectedAuthorId: Record<string, number>[] = await new Promise((resolve, reject)=>{
        db.all(queryAuthor, [decoded.authorId], (err:Error, authorReturned:Record<string, number>[])=>{
            if(err){
                reject(res.status(500).json({
                    message: `authorId not found`
                }))
            }
            else{
              //console.log(authorReturned)
                resolve(Object.assign(authorIdFromDatabase, ...authorReturned)) 
            }
        })
    });

    if (!authorIdFromDatabase) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    else{
      // get userid from the login and passing to the next function
      req.user = { AuthorId: authorIdFromDatabase.AuthorId }; // Attach the user to the request for further use
      console.log(req.user)
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export { authenticate }