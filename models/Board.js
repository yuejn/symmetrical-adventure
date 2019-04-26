const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a board name.',
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Board', boardSchema)
