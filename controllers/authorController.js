const Author = require('../models/author');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAuthorById = async (req, res) => {
  res.json(res.author);
};

// ✅ Now supports one or multiple authors
exports.createAuthor = async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const createdAuthors = await Author.insertMany(data);
    res.status(201).json(createdAuthors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateAuthor = async (req, res) => {
  Object.assign(res.author, req.body);
  try {
    const updatedAuthor = await res.author.save();
    res.json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    await res.author.remove();
    res.json({ message: 'Deleted Author' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
