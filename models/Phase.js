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
  }
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})


phaseSchema.virtual('tiles', {
  ref: 'Tile',
  localField: '_id',
  foreignField: 'phase'
})

function autopopulate(next) {
  this.populate('phases')
  this.populate('tiles')
  next()
}

phaseSchema.pre('find', autopopulate)
phaseSchema.pre('findOne', autopopulate)

module.exports = mongoose.model('Phase', phaseSchema)
