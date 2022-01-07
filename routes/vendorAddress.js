const express = require("express");

const {
    CreateAddress,
    UpdateAddress,
    DeleteAddress,
    GetAddress,
    GetAddressDetailById

} = require('../controllers/vendorAddress');

const router = express.Router();

router.post("/vendoraddress", CreateAddress);
router.put("/vendoraddress/:vendor_id", UpdateAddress);
router.get("/vendoraddress/:vendor_id", GetAddress);
router.get("/vendoraddress/detail/:vendor_id", GetAddressDetailById);
router.delete("/vendoraddress/date/:vendor_id", DeleteAddress);

module.exports = {
    routes: router
}