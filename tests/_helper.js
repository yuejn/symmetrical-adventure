const app = require('../app')
// const chai = require('chai')

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

// const User = require('../models/User')
// const bcrypt = require('bcryptjs')
//
// const defaultUser = {
//   "name": "Tony",
//   "email": "tony@stark.com",
//   "password": "tesseract"
// }
//
// const createUser = async() => {
//   const user = new User(defaultUser)
//   await user.save()
// }
//
// const getDefaultUser = async() => {
//   let users = await User.find({ "email": defaultUser.email })
//   if (users.length === 0) {
//     await createUser()
//     return getDefaultUser()
//   } else {
//     return users[0]
//   }
// }
//
// exports.loginWithDefaultUser = async () => {
//   let user = await getDefaultUser()
//   return chai.request(app)
//     .post('/login')
//     .send({
//       "email": defaultUser.email,
//       "password": defaultUser.password
//     })
//     .expect(200)
// }

// beforeEach(async() => {
//   const collections = await mongoose.connection.db.collections()
//   for (let collection of collections) {
//     await collection.deleteOne()
//   }
// })

beforeEach(() => {
  mongoose.connection.db.dropDatabase()
})
