const express = require("express");
// const upload = require("../utils/multer");

const {
    GetAllVaccineTypes,
    AddVaccineType,
    UpdateVaccineHistory,
    GetAllVaccineBypet,
    AddVaccineHistory,
    GetDetailVaccine,
    GetVaccineByuid,
    DeleteVaccine

} = require('../controllers/vaccine');


const router = express.Router();

router.get("/vaccinetype", GetAllVaccineTypes);
router.get("/vaccine/:pet_id", GetAllVaccineBypet);
router.get("/vaccine/detail/:pet_id", GetDetailVaccine);
router.post("/vaccinetype", AddVaccineType);
router.get("/vaccine/uid/:vacc_id", GetVaccineByuid);
router.post("/vaccine/:pet_id", AddVaccineHistory);
router.put("/vaccine/history/:vacc_id", UpdateVaccineHistory);
// router.post("/vaccine/history/:vaccine_history_id", upload.array("photos"), UploadVaccineHistoryPhoto);
router.delete("/vaccine/:vacc_id", DeleteVaccine);

module.exports = {
    routes: router
}