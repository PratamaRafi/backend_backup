const express = require("express");

const {
    CreateWithdraw,

} = require('../controllers/withdraw');

const router = express.Router();

router.post("/withdraw", CreateWithdraw);
// router.get("/consul/today/:vendor", GetTodayDone);


module.exports = {
    routes: router
}