/* eslint-disable func-names */
const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const ProjectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Please add a name'],
    maxlength: [500, 'Name can not be more than 500 characters'],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'],
  },
});

ProjectsSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Project', ProjectsSchema);
