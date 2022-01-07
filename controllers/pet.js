// const { parse_to_extension, save_file } = require("../utils/files");
const prisma = require("../utils/prisma");
var crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
// console.log(uid);

// firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//   // Send token to your backend via HTTPS
//   // ...
// }).catch(function(error) {
//   next(error);
// });

// var admin = require('firebase-admin');
// // const app = admin.initializeApp();
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
// });

// admin
//   .auth()
//   .verifyIdToken(idToken)
//   .then((decodedToken) => {
//     const uid = decodedToken.uid;
//   })
//   .catch((error) => {
//     next(error);
//   });

const PetController = {
  /** @type RequestHandler */
  async GetByPetUid(req, res, next) {
    const pet_id = req.params.pet_id;
    if (!pet_id) return res.status(404).json("Pet ID of " + pet_id + " not found");

    try {
      const pet = await prisma.userPets.findUnique({
        where: {
          uid: pet_id
        },
        // include: {
        //   VaccineHistory: {
        //     include: {
        //       vaccine_photo: true
        //     }
        //   }
        // }
      });

      if (!pet) {
        return res.status(404).send("");
      }

      return res.json(pet);
    } catch (error) {
      next(error);
    }
  },
  async GetByUid(req, res, next) {
    const user_id = req.params.user_id;
    if (!user_id) return res.notFound();

    try {
      const pet = await prisma.userPets.findMany({
        where: {
          UserId: user_id
        },
        // include: {
        //   VaccineHistory: {
        //     include: {
        //       vaccine_photo: true
        //     }
        //   }
        // }
      });

      if (!pet) {
        return res.status(404).send("");
      }

      return res.json(pet);
    } catch (error) {
      next(error);
    }
  },

  /** @type RequestHandler */
  async GetAll(req, res, next) {
    try {
      const pets = await prisma.userPets.findMany();

      res.json(pets);
    } catch (error) {
      next(error);
    }
  },

  /** @type RequestHandler */
  async Add(req, res, next) {
    // console.log(req.file);
    try {
      const user_id = req.params.user_id;
      const user = await prisma.user.findUnique({
        where: {
          uid: user_id
        }
      });
      if (!user) return pet.status(400).json(user);
      console.log(uuidv4());
      // console.log(user_id);
      // console.log(user);

      const pet = await prisma.userPets.create({
        data: {
          name: req.body.name,
          uid: uuidv4(),
          UserId: user_id,
          profile_picture_url: req.file.path,
          breed: req.body.breed,
          color: req.body.color,
          date_of_birth: new Date(req.body.date_of_birth || ""),
          is_cat_friendly: Boolean(req.body.is_cat_friendly),
          is_purebred: Boolean(req.body.is_purebred),
          is_dog_friendly: Boolean(req.body.is_dog_friendly),
          is_microchipped: Boolean(req.body.is_microchipped),
          is_under_10_child_friendly: Boolean(req.body.is_under_10_child_friendly),
          is_over_10_child_friendly: Boolean(req.body.is_over_10_child_friendly),
          is_neutered: Boolean(req.body.is_neutered),
          gender: req.body.gender,
          species: req.body.species,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      });


      return res.json(pet);
    } catch (error) {
      return next(error);
    }
  },

  /** @type RequestHandler */
  async Update(req, res, next) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return res.notFound();

    try {
      const res = await prisma.userPets.update({
        where: {
          uid: pet_id
        },
        data: {
          name: req.body.name,
          breed: req.body.breed,
          is_cat_friendly: req.body.is_cat_friendly,
          is_child_friendly: req.body.is_child_friendly,
          color: req.body.color,
          date_of_birth: new Date(req.body.date_of_birth || ""),
          is_dog_friendly: req.body.is_dog_friendly,
          gender: req.body.gender,
          is_microchipped: req.body.is_microchipped,
          is_neutered: req.body.is_neutered,
          is_purebred: req.body.is_purebred,
          is_toddler_friendly: req.body.is_toddler_friendly
        }
      });

      return res.json(res);
    } catch (error) {
      return next(error);
    }
  },

  /** @type RequestHandler */
  async Delete(req, res, next) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return res.notFound();

    try {
      await prisma.userPets.delete({
        where: {
          id: pet_id
        },
      });

      return res.status().send("OK");
    } catch (error) {
      res.notFound(error);
    }
  },

  /** @type RequestHandler */
  async AddVaccineHistory(req, res, next) {
    const pet_id = +req.params.pet_id;
    if (!pet_id) return res.notFound();

    // if (error) return res.status(400).json(error);

    try {
      const pet = await prisma
        .pet
        .findUnique({ where: { id: pet_id } })
        .catch(error => {
          return next(error)
        });
      if (!pet) return res.notFound();

      const res = await prisma.vaccineHistory.create({
        data: {
          pet_id: pet.id,
          date_administered: new Date(req.body.date_administered || new Date()),
          date_valid_until: new Date(req.body.date_valid_until || new Date()),
          vaccine_type_id: req.body.vaccine_type_id
        }
      });

      return res.json(res);
    } catch (error) {
      return next(error);
    }
  },

  /** @type RequestHandler */
  async UploadPetPhoto(req, res, next) {
    const pet_id = +req.params.pet_id;
    if (!req.file) return res.status(400).send("");

    try {
      const pet = await prisma.userPets.findUnique({ where: { id: pet_id } });
      if (!pet) return res.notFound();

      const res = await prisma.pet.update({
        where: {
          id: pet.id
        },
        data: {
          profile_picture_url: req.file.path
        }
      });

      return res.json(res);
    } catch (error) {
      return next(error);
    }
  }
};

module.exports = PetController;