const express = require("express");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/pet');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({storage: storage});
const {
    Add,
    GetAll,
    GetByPetUid,
    GetByUid,
    AddVaccineHistory,
    Update,
    Delete

} = require("../controllers/pet");
// const upload = require("../utils/multer");

const router = express.Router();

router.post("/pet/:user_id", upload.single('profile_picture_url'), Add);
router.get("/pet", GetAll)
router.get("/pet/petid/:pet_id", GetByPetUid);
router.get("/pet/uid/:user_id", GetByUid);
router.post("/pet/:pet_id/history", AddVaccineHistory);
router.put("/pet/:pet_id", Update);
// router.post("/pet:pet_id", upload.single("photo"), PetController.UploadPetPhoto);
router.delete("/pet/:pet_id", Delete);

module.exports = {
    routes: router
}
