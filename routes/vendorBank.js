const express = require("express");

const {
    CreateBank,
    UpdateBank,
    DeleteBank,
    GetVendorBank,
    GetAllBank,
    GetDetailBank

} = require('../controllers/vendorBank');

const router = express.Router();

router.post("/vendorbank", CreateBank);
router.get("/vendorbank", GetAllBank);
router.get("/vendorbank/:vendor_id", GetVendorBank);
router.get("/vendorbank/detail/:vendor_id", GetDetailBank);
router.put("/vendorbank/:vendor_id", UpdateBank);
router.delete("/vendorbank/:vendor_id", DeleteBank);


module.exports = {
    routes: router
}