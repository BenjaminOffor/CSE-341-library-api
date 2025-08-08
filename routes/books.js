const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/auth'); // ✅ Import authentication

// Validation
const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

// Middleware to get book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
}

// Routes
router.get('/', bookController.getAllBooks); // Public
router.get('/:id', getBook, bookController.getBookById); // Public
router.post('/', authenticateToken, validateBook, handleValidation, bookController.createBook); // Protected
router.put('/:id', authenticateToken, getBook, validateBook, handleValidation, bookController.updateBook); // Protected
router.delete('/:id', authenticateToken, getBook, bookController.deleteBook); // Protected

module.exports = router;
