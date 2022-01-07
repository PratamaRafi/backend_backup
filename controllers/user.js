const prisma = require("../utils/prisma");
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../configs")

const UserController = {
  async Delete(req, res, next) {
    try {
      const user = await prisma.user.delete({
        where: {
          uid: req.params.user_id
        }
      });
      return res.status(200).json({ "uid": user.uid });
    } catch (error) {
      return next(error);
    }
  },

  async GetAll(req, res) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        uid: true,
        // city_id: true,
        email: true,
        username: true,
        name: true,
        phone_number: true,
        profile_picture_url: true,
        // province_id: true,
        gender: true,
        is_active: true,
        user_address: true,
        user_bank: true,
        user_pets: true
      }
    });
    return res.status(200).json(users);
  },

  async Get(req, res, next) {
    const user_id = req.params.user_id;
    if (!user_id) return res.status(404).json("User ID of " + user_id + " not found");

    try {
      const user = await prisma.user.findUnique({
        where: {
          uid: user_id
        },
        select: {
          id: true,
          uid: true,
          // city_id: false,
          email: true,
          name: true,
          username: true,
          phone_number: true,
          profile_picture_url: true,
          birthdate: true,
          // province_id: false,
          gender: true,
          // City: true,
          // Province: true,
          // Pet: true
        }
      });

      if (!user) {
        return res.status(404).json("User ID of " + user_id + " not found");
      }

      return res.json(user);
    } catch (error) {
      return next(error);
    }
  },

  async Add(req, res, next) {
    try {
      const result = await prisma.user.create({
        data: {
          uid: req.body.uid,
          email: req.body.email,
          name: req.body.name,
          username: req.body.username,
          phone_number: req.body.phone_number,
          profile_picture_url: req.body.profile_picture_url,
          gender: req.body.gender,
          birthdate: req.body.birthdate,
          password: req.body.password,
          is_active: req.body.is_active
          // cityId: req.body.cityId,
        }
      });

      delete result.id;
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async Update(req, rep, next) {
    try {
      const res = await prisma.user.update({
        where: {
          uid: req.params.user_id
        },
        data: {
          name: req.body.name,
          username: req.body.username,
          phone_number: req.body.phone_number,
          profile_picture_url: req.body.profile_picture_url,
          gender: req.body.gender,
          birthdate: req.body.birthdate,
        }
      });

      return rep.status(200).json(res);
    } catch (error) {
      return next(error);
    }
  },

  async generateToken(req, res, next) {
    const user = req.user
    console.log(req, 'user')
    const token = jwt.sign(user, jwtSecret)

    return res.json({token})
  },

  async VerificationUser (req, res, next) {
    try {
        const id = parseInt(req.params.id)
        const result = await prisma.user.update({
            where: {
                id
            },
            data: {
                is_active: req.body.is_active
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
}
};

module.exports = UserController;
