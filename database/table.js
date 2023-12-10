var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./authorAndBook.db', sqlite3.OPEN_READWRITE, function (err) {
    if (err)
        return console.log(err);
});
var author_table = "CREATE TABLE Author (\n    AuthorId INTEGER PRIMARY KEY AUTOINCREMENT,\n    AuthorName VARCHAR(50) NOT NULL,\n    Email VARCHAR(100) NOT NULL UNIQUE,\n    Phone_no CHAR(14) NOT NULL UNIQUE,\n    Password VARCHAR(255) NOT NULL\n\n)";
var book_table = "CREATE TABLE Books (\n    Title VARCHAR(50) NOT NULL UNIQUE,\n    DatePublished VARCHAR(50),\n    Description TEXT(100),\n    PageCount INTEGER (50),\n    Genre VARCHAR(50),\n    BookId INTEGER PRIMARY KEY AUTOINCREMENT,\n    Publisher VARCHAR(50),\n    AuthorId INTEGER,     \n    FOREIGN KEY (AuthorId) REFERENCES Author(AuthorId)\n)";
db.run(author_table, function () {
    console.log('user_table created successfully');
});
db.run(book_table, function () {
    console.log('book_table created successfully');
});
