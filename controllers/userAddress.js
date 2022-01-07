const prisma = require("../utils/prisma");

const UserAddressController = {
  async DeleteAddress(req, res, next) {
    try {
      const address = await prisma.user_Address.delete({
        where: {
          uid: req.params.user_id
        }
      });
      return res.status(200).json({ "uid": address.uid });
    } catch (error) {
      return next(error);
    }
  },

  async GetAllAddress(req, res) {
    const users = await prisma.user_Address.findMany({
      select: {
        id: true,
        uid: true,        
        latitude: true,   
        longitude: true, 
        alias: true,      
        address: true,    
        is_default: true,
        city_id: true,
        UserId: true
      }
    });
    return res.status(200).json(users);
  },

  async GetAddressById(req, res, next) {
    const user_id = req.params.user_id;
    if (!user_id) return res.status(404).json("User ID of " + user_id + " not found");

    try {
      const address = await prisma.user_Address.findUnique({
        where: {
          uid: user_id
        },
        select: {
          uid: true,   
          label: true,      
          address: true,
          province_id: true,
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
  async GetDetailAddress(req, res, next) {
    const user_id = req.params.user_id;
    if (!user_id) return res.status(404).json("User ID of " + user_id + " not found");

    try {
      const address = await prisma.user_Address.findUnique({
        where: {
          uid: user_id
        },
        select: {
          id: true,
          uid: true,   
          label: true,      
          address: true,    
          is_default: true,
          city_id: true,
          province_id: true,
          user_id: true
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
      const user_id = req.params.user_id;
      const user = await prisma.user.findUnique({
        where: {
          uid: user_id
        }
      });
      if (!user) return result.status(400).json(user);

      const result = await prisma.user_Address.create({
        data: {
          uid: req.body.uid,
          label: req.body.label,
          address: req.body.address,
          is_default: req.body.is_default,
          city_id: req.body.city_id,
          province_id: req.body.city_id,
          user_id: user_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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
      const res = await prisma.user_Address.update({
        where: {
          uid: req.params.address_id
        },
        data: {
          label: req.body.label,
          address: req.body.address,
          is_default: req.body.is_default,
          city_id: req.body.city_id,
          province_id: req.body.province_id
        }
      });

      return rep.status(200).json(res);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = UserAddressController;
