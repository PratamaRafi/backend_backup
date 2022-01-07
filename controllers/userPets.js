const prisma = require("../utils/prisma")

const UserPetsController = {
  async getAllUserPets(req, res , next) {
    try {
      const result = await prisma.userPets.findMany({
        select : {
          id: true,
          name: true,
          species: true,
          breed: true,
          color: true,
          date_of_birth: true,
          profile_picture_url: true,
          gender: true,
          is_cat_friendly: true,
          is_dog_friendly: true,
          is_microchipped: true,
          is_neutered: true,
          is_over_10_child_friendly: true,
          is_under_10_child_friendly: true,
          is_purebred: true,
          created_at: true,
        }
      })
      return res.status(200).json(result)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = UserPetsController