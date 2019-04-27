require('dotenv').config();

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')
const secret = process.env.SECRET || 'burritos vulcan yellow';

exports.getUsers = async (req, res) => {
  const users = await User.find(
    {}
  ).sort({
    created: 'desc'
  })
  res.status(200).json(
    users
  )
}

exports.register = (req, res) => {
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if (user) {
      return res.status(400).send({ error: 'Email exists already'})
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => res.status(201).send())
            .catch(err => res.status(400).send({ error: err}))
        })
      })
    }
  })
}


exports.login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if(!user) return res.status(400).send({ error: 'No account found '})
  if(!password) return res.status(400).send({ error: 'No password specified' })

  const match = await bcrypt.compare(password, user.password)
  if(match) {
    const payload = {
      id: user._id,
      name: user.name
    }
    console.log(`There is a match! ${payload}`)
    jwt.sign(payload, secret, { expiresIn: 36000}, (err, token) => {
      if (err) res.status(500).send({ error: 'Error signing token: ' + err })
      return res.status(200).send({ token: `Bearer ${token}`})
    })
  } else {
    return res.status(400).send({ error: 'Incorrect password' })
  }
}
