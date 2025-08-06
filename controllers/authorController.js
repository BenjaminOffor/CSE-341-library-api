const Author = require('../models/author');

// ✅ GET all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ GET author by ID
exports.getAuthorById = async (req, res) => {
  res.json(res.author);
};

// ✅ POST: Create one or multiple authors
exports.createAuthor = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const createdAuthors = await Author.insertMany(data, { ordered: true });
    res.status(201).json(createdAuthors);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ PUT: Update author by ID
exports.updateAuthor = async (req, res) => {
  Object.assign(res.author, req.body);
  try {
    const updatedAuthor = await res.author.save();
    res.json(updatedAuthor);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ DELETE: Delete author by ID
exports.deleteAuthor = async (req, res) => {
  try {
    await Author.deleteOne({ _id: res.author._id });
    res.json({ message: 'Deleted Author' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
