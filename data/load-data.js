require('dotenv').config()
const fs = require('fs');

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  dbName: 'projects_' + process.env.NODE_ENV.toLowerCase(),
  useFindAndModify: false
})
mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise

const Board = require('../models/Board')
const Phase = require('../models/Phase')
const Tile = require('../models/Tile')
const User = require('../models/User')

const boards = JSON.parse(fs.readFileSync(__dirname + '/boards.json', 'utf-8'))
const phases = JSON.parse(fs.readFileSync(__dirname + '/phases.json', 'utf-8'))
// const tiles = JSON.parse(fs.readFileSync(__dirname + '/tiles.json', 'utf-8'))
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'))

async function deleteData() {
  console.log('Deleting the data...')
  await Board.deleteMany({})
  await Phase.deleteMany({})
  await Tile.deleteMany({})
  await User.deleteMany({})
  console.log('Data deleted!')
  process.exit()
}

async function loadData() {
  try {
    await Board.insertMany(boards)
    await Phase.insertMany(phases)
    // await Tile.insertMany(tiles)
    await User.insertMany(users)
    console.log('Loaded the sample data!')
    process.exit()
  } catch(e) {
    console.error(e)
    process.exit();
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
