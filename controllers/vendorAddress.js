const prisma = require("../utils/prisma");

const VendorAddressController = {
  async DeleteAddress(req, res, next) {
    try {
      const address = await prisma.user_address.delete({
        where: {
          uid: req.params.user_id
        }
      });
      return res.status(200).json({ "uid": address.uid });
    } catch (error) {
      return next(error);
    }
  },

  async GetAddress(req, res) {
    const users = await prisma.user_address.findMany({
      select: {
        uid: true,
        // city_id: false,
        alias: true,
        address: true,
        // province_id: false,
      }
    });
    return res.status(200).json(users);
  },

  async GetAddressDetailById(req, res, next) {
    const user_id = req.params.user_id;
    if (!user_id) return res.status(404).json("User ID of " + user_id + " not found");

    try {
      const address = await prisma.user_address.findUnique({
        where: {
          uid: user_id
        },
        select: {
          id: true,
          uid: true,
          // city_id: false,
          longitude: true,
          latitude: true,
          alias: true,
          address: true,
          // province_id: false,
          is_default: true,
          // City: true,
          // Province: true,
          // Pet: true
        }
      });

      if (!address) {
        return res.status(404).json("User ID of " + user_id + " not found");
      }

      return res.json(address);
    } catch (error) {
      return next(error);
    }
  },

  async CreateAddress(req, res, next) {
    try {
      const result = await prisma.user_address.create({
        data: {
          uid: req.body.uid,
          email: req.body.email,
          name: req.body.name,
          username: req.body.username,
          phone_number: req.body.phone_number,
          profile_picture_url: req.body.profile_picture_url,
          gender: req.body.gender,
          // cityId: req.body.cityId,
        }
      });

      delete result.id;
      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  },

  async UpdateAddress(req, rep, next) {
    try {
      const res = await prisma.user_address.update({
        where: {
          uid: req.params.user_id
        },
        data: {
          name: req.body.name,
          username: req.body.username,
          phone_number: req.body.phone_number,
          profile_picture_url: req.body.profile_picture_url,
          gender: req.body.gender,
        }
      });

      return rep.status(200).json(res);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = VendorAddressController;
