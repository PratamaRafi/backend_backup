const prisma = require("../utils/prisma");

const ProvinceController = {
  async DeleteCity(req, rep, next) {
    let res = await prisma.city.delete({
      where: {
        id: +req.params.city_id
      }
    });

    return rep.json(res);
  },

  async Delete(req, rep, next) {
    let res = await prisma.province.delete({
      where: {
        id: +req.params.province_id
      }
    });

    return rep.json(res);
  },

  async Add(req, rep, next) {
    try {
      const province = await prisma.province.create({
        data: {
          name: req.body.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
          // city_id: req.params.id
        }
      });
      return rep.json(province);
    } catch (error) {
      next(error);
    }
  },

  async AddCity(req, rep, next) {
    try {
      const province = parseInt(req.params.province)
      const city = await prisma.city.create({
        data: {
          name: req.body.name,
          province_id: province,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
      return rep.json(city);
    } catch (error) {
      next(error);
    }
  },

  async GetAll(req, rep, next) {
    try {
      const provinces = await prisma.province.findMany();
      return rep.json(provinces);
    } catch (error) {
      next(error);
    }
  },

  async GetAllCities(req, rep, next) {
    try {
      const cities = await prisma.city.findMany();
      return rep.json(cities);
    } catch (error) {
      next(error);
    }
  },
  async GetCitiesbyId(req, rep, next) {
    const province_id = req.params.province_id;
    try {
      const cities = await prisma.city.findMany({
        where: {
          province_id: parseInt(province_id)
        },
      });
      return rep.json(cities);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = ProvinceController;
