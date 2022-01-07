const express = require("express");

const {
    CreateBank,
    UpdateBank,
    DeleteBank,
    GetAllBank,
    GetDetailBank,
    GetUserBank

} = require('../controllers/userBank');

const router = express.Router();

router.post("/userbank", CreateBank);
router.get("/userbank", GetAllBank);
router.get("/userbank/:user_id", GetUserBank);
router.get("/userbank/detail/:user_id", GetDetailBank);
router.put("/userbank/:user_id", UpdateBank);
router.delete("/userbank/:user_id", DeleteBank);


module.exports = {
    routes: router
}