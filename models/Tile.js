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
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

tileSchema.statics.findByPhase = (phaseId, next) => {
  let query = this.findOne()
  Phase.findOne({ 'phase': phaseId }, (err, column) => {
    query.where(
      {
        phase: column._id
      }
    ).exec(next)
  })
  return query
}

module.exports = mongoose.model('Tile', tileSchema)
