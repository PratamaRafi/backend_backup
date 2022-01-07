const prisma = require("../utils/prisma");

const VaccineController = {
  async GetAllVaccineTypes(req, rep, next) {
    try {
      const vaccine_types = await prisma.vaccineType.findMany();
      return rep.json(vaccine_types);
    } catch (error) {
      return next(error);
    }
  },

  async AddVaccineType(req, rep, next) {
    try {
      const res = await prisma.vaccineType.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });

      return rep.json(res);
    } catch (error) {
      return next(error);
    }
  },

  /** @type RequestHandler */
  async UploadVaccineHistoryPhoto(req, rep, next) {
    const vaccine_history_id = +req.params.vaccine_history_id;
    // if (!req.file) return rep.status(400).send("");
    // if (!vaccine_history_id) return rep.notFound();
    // if (!req.isMultipart()) return rep.badRequest();

    try {
      const vaccine_history = await prisma.vaccineHistory.findUnique({ where: { id: vaccine_history_id } });
      if (!vaccine_history) return rep.status(404);

      req.files.forEach(async (file) => {
        try {
          await prisma.vaccineHistoryPhoto.create({
            data: {
              vaccine_history_id: vaccine_history_id,
              path: file.path
            }
          });
        } catch (error) {
          console.log(error);
          console.log("Error occured when putting a file, continuing...");
        }
      });
      const res = await prisma.vaccineHistoryPhoto.findMany({
        where: {
          vaccine_history_id: vaccine_history_id
        }
      });

      return rep.json(res);
    } catch (error) {
      return next(error);
    }
  },

  async UpdateVaccineHistory(req, rep, next) {
    const vacc_id = +req.params.vacc_id;
    if (!vacc_id) return rep.status(404).json("Missing data " + vacc_id);

    try {
      const res = await prisma.vaccineHistory.update({
        where: {
          uid: vacc_id
        },
        data: {
          veterinary: req.body.veterinary,
          vaccine_photo: req.body.vaccine_photo,
          date_administered: new Date(req.body.date_administered || ""),
          date_valid_until: new Date(req.body.date_valid_until || ""),
          vaccine_type_id: req.body.vaccine_type_id,
          updated_at: new Date().toISOString()
        }
      });

      return rep.json(res);
    } catch (error) {
      return next(error);
    }
  },

  async GetAllVaccineHistory(req, rep, next) {
    try {
      const vaccine_types = await prisma.vaccineType.findMany();
      return rep.json(vaccine_types);
    } catch (error) {
      return next(error);
    }
  },

  async AddVaccineHistory(req, rep, next) {
    try {
      const pet_id = req.params.pet_id;
      const pet = await prisma.userPets.findUnique({
        where: {
          uid: pet_id
        }
      });
      if (!pet) return pet.status(400).json(user);

      const res = await prisma.vaccineHistory.create({
        data: {
          uid: req.body.uid,
          pet_id: pet_id,
          vaccine_type_id: req.body.vaccine_type_id,
          veterinary: req.body.veterinary,
          vaccine_photo: req.body.vaccine_photo,
          date_administered: new Date(req.body.date_administered || ""),
          is_manual: req.body.is_manual,
          date_valid_until: new Date(req.body.date_valid_until || ""),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      });
      console.log(res.veterinary);

      return rep.json(res);
    } catch (error) {
      return next(error);
    }
  },

  async GetDetailVaccine(req, res) {
    const pet_id = parseInt(req.params.pet_id);
    const vaccine = await prisma.vaccineHistory.findMany({
      where: {
        pet_id: pet_id
      },
      select: {
        uid: true,
        pet_id: true,
        veterinary: true,
        vaccine_photo: true,
        vaccine_type_id: true ,
        date_administered: true ,
        is_manual: true ,
        date_valid_until: true ,
        vaccine_type_id: true ,
      }
    });
    return res.status(200).json(vaccine);
  },
  async GetAllVaccineBypet(req, res) {
    const pet_id = parseInt(req.params.pet_id);
    const vaccine = await prisma.vaccineHistory.findMany({
      where: {
        pet_id: pet_id
      },
      select: {
        uid: true,
        pet_id: true,
        veterinary: true,
        vaccine_photo: true,
        date_valid_until: true ,
        vaccine_type_id: true ,
      }
    });
    return res.status(200).json(vaccine);
  },

  
  async GetVaccineByuid(req, res) {
    const vacc_id = req.params.vacc_id;
    const vaccine = await prisma.vaccineHistory.findMany({
      where: {
        uid: vacc_id
      },
      select: {
        uid: true,
        pet_id: true,
        veterinary: true,
        vaccine_photo: true,
        vaccine_type_id: true ,
        date_administered: true ,
        is_manual: true ,
        date_valid_until: true ,
        vaccine_type_id: true ,
      }
    });
    return res.status(200).json(vaccine);
  },
  
  async DeleteVaccine(req, res, next) {
    try {
      const vaccine = await prisma.vaccineHistory.delete({
        where: {
          uid: req.params.vacc_id
        }
      });
      return res.status(200).json({ "uid": vaccine.uid + " has deleted"});
    } catch (error) {
      return next(error);
    }
  }
};

module.exports = VaccineController;
