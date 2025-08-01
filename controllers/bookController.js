const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  res.json(res.book);
};

// ✅ Handles both single book and array of books
exports.createBook = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const newBooks = await Book.insertMany(data);
    res.status(201).json(newBooks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  Object.assign(res.book, req.body);
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
