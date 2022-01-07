const express = require("express");

const {
    CreateConsul,
    GetTodayDone,
    UpdateStatus,
    GetByDate,
    GetTodayAll,
    GetDetailConsul,
    GetDetailPayment,
    GetnotDone

} = require('../controllers/consultation');

const router = express.Router();

router.post("/consul", CreateConsul);
router.get("/consul/today/:vendor_id", GetTodayDone);
router.get("/consul/undone/:vendor_id", GetnotDone);
router.get("/consul/date/:vendor_id", GetByDate);
router.put("/consul/:consul_id", UpdateStatus);
router.get("/consul/:vendor", GetTodayAll);
router.get("/consul/detail/:consul_id", GetDetailConsul);
router.get("/consul/payment/:consul_id", GetDetailPayment);

module.exports = {
    routes: router
}