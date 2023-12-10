# week-6-task-SQ012-Node-pod-D
# EXPRESS 

### Setup
1. Use and setup the project with `yarn`.
2. Convert the project to Typescript.
3. Initialize tsconfig.
4. Create .gitignore file to ignore the node_modules

### Library Book (Rest Backend)

## Problem Description:

You will be tasked with creating a node.js based Rest application which will serve as a data source for a library web application. The application will expose one rest resources
* book Resource - This will handle CRUD endpoints for managing a book list. All endpoints will only be accessed by an authenticated user.
Using database.json file as database.

What we are testing.
Express project structure
REST API Endpoint Nomenclature
Javascript ECMA standards
Unit Testing

## Requirements:

- You can add a new book.
- You can browse through all books.
- You can view details of each book
- You can edit a book.
- You can delete a book



## How will I complete this project?
- Your application should be able to perform.
- GET Request which returns all the data in your database 
- POST Request which adds data to your database
- PUT Request which updates fields of a particular data using the id in database
- DELETE Request which removes a particular data from your database using the id
- Host your application on Heroku
-Data Format: Contains both the author's registered information and the books created by them.

```
{

    “AuthorName”: “Barack Obama”,
    "email":"mk@gmail.com",
    "password": "yourpassword",
    "PhoneNumber":"4198889999000033",
  
books:[
     {
        “Title”: “A Promised Land”,
        “datePublished”: “2020-0-12T19:0455.455z”,
        “Description”:  “A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it         is the first of a planned two-volume series”
        “pageCount”: 768,
        “Genre”: “autobiography”,
        “bookId”: 1,
        “Publisher”: “Crown”
    }
]
}

```
## Test coverage
- Make sure you write test to cover your application using Jest/supertest

### Test
Test coverage
Make sure you write test to cover your application using supertest
Test for a GET request
Test for a POST request
Test for a PUT request
Test for a DELETE request


## FRONTEND
- Create a Login Page and Sign Up Page
- Page to display all books
- Page to display each book details
- Implement an admin/dashboard area to add, edit and delete ( User can only edit and delete books created by them)
# week-6-task-SQ012-Node-pod-D
# EXPRESS 

### Setup
1. Use and setup the project with `yarn`.
2. Convert the project to Typescript.
3. Initialize tsconfig.
4. Create .gitignore file to ignore the node_modules

### Library Book (Rest Backend)

## Problem Description:

You will be tasked with creating a node.js based Rest application which will serve as a data source for a library web application. The application will expose one rest resources
* book Resource - This will handle CRUD endpoints for managing a book list. All endpoints will only be accessed by an authenticated user.
Using database.json file as database.

What we are testing.
Express project structure
REST API Endpoint Nomenclature
Javascript ECMA standards
Unit Testing

## Requirements:

- You can add a new book.
- You can browse through all books.
- You can view details of each book
- You can edit a book.
- You can delete a book



## How will I complete this project?
- Your application should be able to perform.
- GET Request which returns all the data in your database 
- POST Request which adds data to your database
- PUT Request which updates fields of a particular data using the id in database
- DELETE Request which removes a particular data from your database using the id
- Host your application on Heroku
-Data Format: Contains both the author's registered information and the books created by them.

```
{

    “AuthorName”: “Barack Obama”,
    "email":"mk@gmail.com",
    "password": "yourpassword",
    "PhoneNumber":"4198889999000033",
  
books:[
     {
        “Title”: “A Promised Land”,
        “datePublished”: “2020-0-12T19:0455.455z”,
        “Description”:  “A Promised Land is a memoir by Barack Obama, the 44th President of the United States from 2009 to 2017. Published on November 17, 2020, it         is the first of a planned two-volume series”
        “pageCount”: 768,
        “Genre”: “autobiography”,
        “bookId”: 1,
        “Publisher”: “Crown”
    }
]
}

```
## Test coverage
- Make sure you write test to cover your application using Jest/supertest

### Test
Test coverage
Make sure you write test to cover your application using supertest
Test for a GET request
Test for a POST request
Test for a PUT request
Test for a DELETE request


## FRONTEND
- Create a Login Page and Sign Up Page
- Page to display all books
- Page to display each book details
- Implement an admin/dashboard area to add, edit and delete ( User can only edit and delete books created by them)






<!-- 
{
        "Title": "Rich dad Poor Dad",
        "datePublished": "2020-0-12T19:0455.455z",
        "Description":"A Land og honey is a memoir",
        "pageCount": 768,
        "Genre": "biography",
        "bookId": 1,
        "Publisher": "Robert Kyasosaki"
    } -->