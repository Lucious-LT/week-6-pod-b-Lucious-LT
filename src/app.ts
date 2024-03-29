import createError from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from "express-session";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import signupUser from './routes/signup';
import loginUser from './routes/login'; // Import the loginUser module from the correct file path // Import the authSchema module from the correct file path

dotenv.config()
const app = express();
const DB = process.env.DB_URL;
mongoose
  .connect(DB || 'mongodb+srv://Lucious:lucious0801a,H@cluster0.uy59lo1.mongodb.net/')
  .then(() => {
    console.log('db connected');
  });


app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));



app.use('/signup', signupUser);
app.use('/', loginUser); // Add a comma after '/Auth'

// app.use('/author', authorRouter);
// app.use('/books', booksRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.send(err);
});

module.exports = app;
