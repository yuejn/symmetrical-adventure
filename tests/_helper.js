const app = require('../app')

before(done => {
  app.on('appStarted', done())
})

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  dbName: 'projects_' + process.env.NODE_ENV.toLowerCase(),
  useFindAndModify: false
})
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
const db = mongoose.connection
db.on('error', err => console.error(err.message))

// beforeEach(async() => {
//   const collections = await mongoose.connection.db.collections()
//   for (let collection of collections) {
//     await collection.deleteOne()
//   }
// })

beforeEach(() => {
  mongoose.connection.db.dropDatabase()
})
