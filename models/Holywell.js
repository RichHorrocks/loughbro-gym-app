const mongoose = require('mongoose');

const HolywellSchema = mongoose.Schema({
  day: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('holywell', HolywellSchema);
