const mongoose = require('mongoose')
const Tile = mongoose.model('Tile')
const Board = mongoose.model('Board')
const Phase = mongoose.model('Phase')
const User = mongoose.model('User')

exports.getTile = async(req, res) => {
  return await Tile.findById( req.params.id )
    .populate('phase')
    .populate('board')
    .populate('owner')
    .exec((err, tile) => {
      if (err) console.error(err)
      res.send({
        id: tile._id,
        name: tile.name,
        description: tile.description,
        phase: tile.phase.name,
        board: {
          id: tile.board._id,
          name: tile.board.name
        },
        owner: {
          id: tile.owner._id,
          name: tile.owner.name
        },
        createdAt: tile.createdAt,
        updatedAt: tile.updatedAt
      })
    })
}

exports.addTile = async(req,res) => {
  const owner = await User.findOne({})

  const { name, description, phase: phaseName, board: boardId } = req.body
  const board = await Board.findById(boardId)
  const phase = await Phase.findOne({
    name: phaseName,
    board: boardId
  })

  const tile = await Tile.create({
    name,
    description,
    owner: owner._id,
    phase: phase._id,
    board: board._id
  })
  res.status(201).send({
    name,
    description
  })
}


exports.updateTile = async(req, res) => {
  const updates = req.body
  const { id, name, description, createdAt, updatedAt } = await Tile.findOneAndUpdate(
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

exports.deleteTile = async(req, res) => {
  const tile = await Tile.findById( req.params.id )
  let result = null
  if(tile) {
    result = await tile.remove()
  }
  res.status(204).send(result)
}
