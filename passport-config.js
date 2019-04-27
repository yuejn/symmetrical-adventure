require('dotenv').config();
const secret = process.env.SECRET || 'burritos vulcan yellow';
const mongoose = require('mongoose');
const User = require('./models/User');

const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
        .then(user => {
          if (user) {
            return done(null, {
              id: user.id,
              name: user.name,
              email: user.email
            })
          }
          return done(null, false)
        })
        .catch(err => console.error(err))
    })
  )
}
