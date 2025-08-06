const Book = require('../models/book');

// ✅ GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET book by ID (req.book comes from middleware)
exports.getBookById = async (req, res) => {
  res.json(res.book);
};

// ✅ POST: Create one or more books
exports.createBook = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const newBooks = await Book.insertMany(data, { ordered: true });
    res.status(201).json(newBooks);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ PUT: Update book by ID
exports.updateBook = async (req, res) => {
  Object.assign(res.book, req.body);
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ DELETE book by ID
exports.deleteBook = async (req, res) => {
  try {
    await Book.deleteOne({ _id: res.book._id });
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
