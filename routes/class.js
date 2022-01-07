const express = require("express")

const {
  CreateClass,
  GetClasses,
  UpdateClass
} = require("../controllers/class")

const router = express.Router()

router.post("/class", CreateClass)
router.get("/class", GetClasses)
router.put("/class/:id", UpdateClass)

module.exports = {
  routes: router
}