const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position', required: true },
});

module.exports = mongoose.model('Project', projectSchema);
