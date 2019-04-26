const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const tileSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a tile name.',
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  board: {
    type: mongoose.Schema.ObjectId,
    ref: 'Board',
    required: 'The board this tile belongs to must be supplied.',
    index: true
  },
  phase: {
    type: mongoose.Schema.ObjectId,
    ref: 'Phase',
    required: 'The phase this tile belongs to must be supplied.',
    index: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'The user this tile belongs to must be supplied.',
    index: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Tile', tileSchema)
