const mongoose = require('mongoose')
const Board = mongoose.model('Board')

exports.getBoards = async(req, res) => {
  const boards = await Board.find(
    {}
  ).sort({
    created: 'desc'
  })
  res.status(200).json(
    boards // TODO push only IDs, names, and descriptions, phase/tile counts
  )
}

exports.getBoard = async(req, res) => {
  return await Board.findById(req.params.id)
    .exec((err, board) => {
      if(err) console.error(err)
      res.send({
        board
      })
    })
}

exports.addBoard = async(req, res) => {
  if (!req.body) {
    return res.status(400).send({
      error: 'Please supply a `name` and `description`.'
    })
  }
  const { name, description } = req.body
  const board = await Board.create({ name, description })
  res.status(201).send({
    name,
    description
  })
}

exports.updateBoard = async(req, res) => {
  const updates = req.body
  const { id, name, description, createdAt, updatedAt } = await Board.findOneAndUpdate(
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

exports.deleteBoard = async(req, res) => {
  const board = await Board.findById( req.params.id )
  let result = null
  if(board) {
    result = await board.remove()
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
