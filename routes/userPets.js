const express = require("express");

const {
  getAllUserPets
} = require('../controllers/userPets')
const router = express.Router()

router.get("/admin/user-pets", getAllUserPets)

module.exports = {
  routes: router
}