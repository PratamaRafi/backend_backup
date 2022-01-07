const passport = require('passport')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const { jwtSecret } = require('./index')
const prisma = require("../utils/prisma");
const bcrypt = require('bcryptjs')
const CustomError = require('../utils/CustomError')
const errorMessages = require('../utils/errorMessages')

module.exports = (app) => {
  app.use(passport.initialize())

  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        const user = await prisma.admins.findUnique({
          where: {
            email
          }
        })
        const isValid = bcrypt.compareSync(password, user.password)
        if(isValid) {
          return done(null, user)
        } else {
          throw new CustomError(400, errorMessages.INVALID_PASSWORD)
        }
      } catch (error) {
        return done(error)
      }
    }
  ))

  passport.use('jwt', new JWTStrategy(
    {
      secretOrKey: jwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      try {
        const user = await prisma.admins.findUnique({
          where: {
            email: jwt_payload.email
          }
        })
        if(user) {
          return done(null, user)
        } else {
          throw new CustomError(400, errorMessages.USER_NOT_FOUND)
        }
      } catch (error) {
        return done(error)
      }
    }
  ))

}