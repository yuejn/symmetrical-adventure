require('dotenv').config()

const fs = require('fs')
const join = require('path').join
const mongoose = require('mongoose')
const passport = require('passport')
const express = require('express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const errorHandlers = require('./handlers/errorHandlers');
const models = join(__dirname, 'models')
const app = express()

app.use(passport.initialize())
require('./passport-config')(passport)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())

// load models before routes
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => {
    require(join(models, file))
  });

const router = require('./routes')

app.use('/', router)
app.use(errorHandlers.notFound);
app.use(errorHandlers.productionErrors);

app.set('port', process.env.PORT || 3000)

if (process.env.NODE_ENV == 'production') {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
} else {
  mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    dbName: 'projects_' + process.env.NODE_ENV.toLowerCase(),
    useFindAndModify: false
  })
}
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
const db = mongoose.connection
db.on('error', err => console.error(err.message))

module.exports = app
