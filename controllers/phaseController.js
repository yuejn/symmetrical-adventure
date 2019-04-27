const mongoose = require('mongoose')
const Phase = mongoose.model('Phase')

exports.getPhase = async(req, res) => {
  return await Phase.findById(req.params.id)
    .exec((err, phase) => {
      if(err) console.error(err)
      res.send({
        phase
      })
    })
}

exports.addPhase = async(req, res) => {
  const { name, description, board } = req.body
  const phase = await Phase.create({ name, description, board })
  res.status(201).send({
    name,
    description,
    board
  })
}

exports.updatePhase = async(req, res) => {
  const updates = req.body
  const { id, name, board, description, createdAt, updatedAt } = await Phase.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query'}
  )
  res.status(200).send({
    id,
    name,
    description,
    createdAt,
    updatedAt
  })
}

exports.deletePhase = async(req, res) => {
  const phase = await Phase.findById( req.params.id )
  let result = null
  if(phase) {
    result = await phase.remove()
  }
  res.status(204).send(result)
}

exports.validateNew = (req, res, next) => {
  req.sanitizeBody('name')
  req.sanitizeBody('description')
  req.checkBody('name', '`name` is required').notEmpty()

  const errors = req.validationErrors()
  if (errors) {
    return res.status(400)
      .send({
        errors: errors.map(err => err.msg)
      })
  }
  next()
}
