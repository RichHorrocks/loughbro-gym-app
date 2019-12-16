const mongoose = require('mongoose');

const PowerbaseSchema = mongoose.Schema({
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

module.exports = mongoose.model('powerbase', PowerbaseSchema);
