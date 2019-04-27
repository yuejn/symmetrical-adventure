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
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

boardSchema.virtual('phases', {
  ref: 'Phase',
  localField: '_id',
  foreignField: 'board'
})

boardSchema.virtual('tiles', {
  ref: 'Tile',
  localField: '_id',
  foreignField: 'board'
})

function autopopulate(next) {
  this.populate('phases')
  this.populate('tiles')
  next()
}

boardSchema.pre('find', autopopulate)
boardSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Board', boardSchema)
