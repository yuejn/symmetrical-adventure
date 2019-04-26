const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const phaseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a phase name.',
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  board: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
    required: 'The board this phase belongs to must be supplied.',
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Phase', phaseSchema)
