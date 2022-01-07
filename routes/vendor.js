const express = require("express");

const {
    CreateVendor,
    GetAll,
    GetDetailAll,
    VendorFilter,
    // GetById,
    GetDetailById,
    // GetByName,
    // GetByDay,
    // GetBySpec,
    ScheduleBySpec,
    GetByRating,
    GetBest,
    UpdateVendor,
    VerificationVendor,
    CreateVendorFromCms
} = require('../controllers/vendor');

const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendor", GetAll);
router.get("/vendor/detail", GetDetailAll);
// router.get("/vendor/:vendor_id", GetById);
router.get("/vendor/detail/:vendor_id", GetDetailById);
router.get("/vendor/filter", VendorFilter);
// router.get("/vendor/detail/:name", GetByName);
// router.get("/vendor/:days", GetByDay);
// router.get("/vendor/speciality/:spec", GetBySpec);
router.get("/vendor/schedule/:spec", ScheduleBySpec);
router.get("/vendorsort", GetByRating);
router.get("/vendortop", GetBest);
router.put("/vendor/update/:vendor_id", UpdateVendor);
router.put("/admin/vendor/:id", VerificationVendor);
router.post("/admin/vendor", CreateVendorFromCms);

module.exports = {
    routes: router
}