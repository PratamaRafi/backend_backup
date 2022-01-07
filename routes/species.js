const express = require("express")

const {
  createSpecies,
  getAllSpecies,
  updateSpecies
} = require("../controllers/species")

const router = express.Router()

router.post("/admin/species", createSpecies)
router.get("/admin/species", getAllSpecies)
router.put("/admin/species/:id", updateSpecies)

module.exports = {
  routes: router
}