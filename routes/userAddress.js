const express = require("express");

const {
    CreateAddress,
    UpdateAddress,
    DeleteAddress,
    GetAllAddress,
    GetDetailAddress,
    GetAddressById

} = require('../controllers/userAddress');

const router = express.Router();

router.post("/useraddress/:user_id", CreateAddress);
router.get("/useraddress", GetAllAddress);
router.get("/useraddress/:user_id", GetAddressById);
router.get("/useraddress/detail/:user_id", GetDetailAddress);
router.put("/useraddress/:address_id", UpdateAddress);
router.delete("/useraddress/:address_id", DeleteAddress);


module.exports = {
    routes: router
}