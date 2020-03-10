const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["new", "in_progress", "complete"]
  }
});

module.exports = mongoose.model('Task', TaskSchema);