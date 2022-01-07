const router = require("express").Router();
const ProvinceController = require("../controllers/province");

router.get("/cities", ProvinceController.GetAllCities);
router.get("/cities/:province_id", ProvinceController.GetCitiesbyId);
router.post("/cities/:province", ProvinceController.AddCity);
router.delete("/cities/:city_id", ProvinceController.DeleteCity);
router.get("/province", ProvinceController.GetAll);
router.post("/province", ProvinceController.Add);
router.delete("/:province_id", ProvinceController.Delete)

module.exports = {
    routes: router
}
