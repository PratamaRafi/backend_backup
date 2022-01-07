const prisma = require("../utils/prisma")

const ClassController = {
  async CreateClass (req, res, next) {
    try {
      const result = await prisma.class.create({
        data: {
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
  async GetClasses (req, res, next) {
    try {
      const classes = await prisma.class.findMany({
        select: {
          id: true,
          name: true,
          created_at: true,
          updated_at: true,
          deleted_at: true
        }
      })
      return res.status(201).json(classes)
    } catch (error) {
      return next(error)
    }
  },
  async UpdateClass (req, res, next) {
    try {
      const id = parseInt(req.params.id)
      const update = await prisma.class.update({
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
  }
}

module.exports = ClassController