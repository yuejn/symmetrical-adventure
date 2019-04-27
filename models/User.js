const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name.'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please enter an email address.'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)
