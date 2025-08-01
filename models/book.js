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
    required: false
  },
  genre: {
    type: String,
    required: false
  },
  pages: {
    type: Number,
    required: false
  },
  available: {
    type: Boolean,
    default: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Book', bookSchema);
