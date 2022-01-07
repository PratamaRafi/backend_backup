const express = require("express");

const {
    CreateSchedule,
    GetScheduleByid,
    UpdateSchedule

} = require('../controllers/schedule');

const router = express.Router();

router.post("/schedule", CreateSchedule);
router.get("/schedule/:vendor", GetScheduleByid);
router.put("/schedule/:id", UpdateSchedule);

module.exports = {
    routes: router
}