const prisma = require("../utils/prisma")

const SpeciesController = {
  async createSpecies(req, res, next) {
    try {
      const result = await prisma.species.create({
        data: {
          ClassId: req.body.ClassId,
          name: req.body.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })
      return res.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  },
  async getAllSpecies(req, res, next) {
    try {
      const result = await prisma.species.findMany({
        select: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true,
          deleted_at: true
        }
      })
      return res.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  },
  async updateSpecies(req, res, next) {
    try {
      const id = parseInt(req.params.id)
      const update = await prisma.species.update({
        where: { id },
        data: {
          name: req.body.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })
      return res.status(201).json(update)
    } catch (error) {
      return next(error)
    }
  },
}

module.exports = SpeciesController