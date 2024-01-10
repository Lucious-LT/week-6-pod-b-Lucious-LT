"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login")); // Import the loginUser module from the correct file path // Import the authSchema module from the correct file path
dotenv_1.default.config();
const app = (0, express_1.default)();
const DB = process.env.DB_URL;
mongoose_1.default
    .connect(DB || 'mongodb+srv://Lucious:lucious0801a,H@cluster0.uy59lo1.mongodb.net/')
    .then(() => {
    console.log('db connected');
});
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));
const port = 4000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
// app.use(bodyParser.json());
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/signup', signup_1.default);
app.use('/', login_1.default); // Add a comma after '/Auth'
// app.use('/author', authorRouter);
// app.use('/books', booksRouter);
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(500);
    res.send(err);
});
module.exports = app;
