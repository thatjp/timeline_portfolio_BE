/* eslint-disable func-names */
const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a position title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
});

module.exports = mongoose.model('Position', PositionSchema);
