const prisma = require("../utils/prisma")
const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../configs")

const CmsAdminsController = {
  async createUser(req, res, next) {
    try {
      const result = await prisma.admins.create({
        data: {
          uid: req.body.uid,
          email: req.body.email,
          name: req.body.name,
          username: req.body.username,
          phone_number: req.body.phone_number,
          profile_picture_url: req.body.profile_picture_url,
          gender: req.body.gender,
          password: req.body.password
        }
      })
      delete result.id
      return res.status(201).json(result)
    } catch (error) {
      return next(error)
    }
  },

  async generateToken(req, res, next) {
    const user = req.user
    console.log(req,'cmsadmins')
    const token = jwt.sign(user, jwtSecret)
  
    return res.json({token})
  }
}

module.exports = CmsAdminsController