const express = require("express")
const passport = require("passport")
const router = express.Router()
const {
  createUser,
  generateToken
} = require("../controllers/admins")

router.post("/admin", createUser)
router.post("/admin/login",
  passport.authenticate('local', { session: false }),
  generateToken
)

module.exports = { routes: router }