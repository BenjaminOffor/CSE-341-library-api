const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  yearPublished: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
