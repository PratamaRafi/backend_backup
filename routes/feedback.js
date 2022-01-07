const express = require("express");

const {
    CreateFeedback,
} = require('../controllers/feedback');

const router = express.Router();

router.post("/feedback/:vendor_id", CreateFeedback);

module.exports = {
    routes: router
}