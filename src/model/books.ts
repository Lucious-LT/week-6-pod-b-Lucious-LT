import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  datePublished: { type: Date, required: true },
  pageCount: { type: Number, required: true },
  publisher: { type: String, required: true },
  Genre: { type: Number, required: true },
  bookId: { type: Number, required: true },
  published: { type: Boolean, required: true },
  // Add more fields as needed
});

const Book = mongoose.model('Book', bookSchema);

export { Book };
