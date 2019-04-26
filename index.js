require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true } )
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
const db = mongoose.connection
db.on('error', err => console.error(err.message))

require('./models/Board')
require('./models/Phase')
require('./models/Tile')
require('./models/User')

const express = require('express')
const app = express()

app.set('port', process.env.PORT || 3000)
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
