const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./authorAndBook.db', sqlite3.OPEN_READWRITE, (err: any)=>{
    if(err) return console.log(err)
})

const author_table = `CREATE TABLE Author (
    AuthorId INTEGER PRIMARY KEY AUTOINCREMENT,
    AuthorName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Phone_no CHAR(14) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL

)`

const book_table = `CREATE TABLE Books (
    Title VARCHAR(50) NOT NULL UNIQUE,
    DatePublished VARCHAR(50),
    Description TEXT(100),
    PageCount INTEGER (50),
    Genre VARCHAR(50),
    BookId INTEGER PRIMARY KEY AUTOINCREMENT,
    Publisher VARCHAR(50),
    AuthorId INTEGER,     
    FOREIGN KEY (AuthorId) REFERENCES Author(AuthorId)
)`

db.run(author_table, ()=>{
    console.log('user_table created successfully')
})
db.run(book_table, ()=>{
    console.log('book_table created successfully')
})

