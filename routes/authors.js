const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const authorController = require('../controllers/authorController');
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/auth'); // ✅ Import authentication

// Validation
const validateAuthor = [
  body('name').notEmpty().withMessage('Author name is required'),
  body('bio').optional().isString().withMessage('Bio must be a string'),
  body('birthdate').optional().isISO8601().toDate().withMessage('Birthdate must be a valid date'),
];

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

// Middleware to get author by ID
async function getAuthor(req, res, next) {
  let author;
  try {
    author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.author = author;
  next();
}


// Routes
router.get('/', authorController.getAllAuthors); // Public
router.get('/:id', getAuthor, authorController.getAuthorById); // Public
router.post('/', authenticateToken, validateAuthor, handleValidation, authorController.createAuthor); // Protected
router.put('/:id', authenticateToken, getAuthor, validateAuthor, handleValidation, authorController.updateAuthor); // Protected
router.delete('/:id', authenticateToken, getAuthor, authorController.deleteAuthor); // Protected

module.exports = router;
