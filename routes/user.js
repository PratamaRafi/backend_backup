const express = require("express");
const passport = require("passport");

const {
    GetAll,
    Add,
    Get,
    Update,
    Delete,
    generateToken,
    VerificationUser
} = require('../controllers/user');


const router = express.Router();

router.get("/user",
    // passport.authenticate('jwt', { session: false }), 
    GetAll
);
router.post("/user", Add);
router.get("/user/:user_id", Get);
router.put("/user/:user_id", Update);
router.delete("/user/:user_id", Delete);
router.post(
    "/user/login",
    passport.authenticate('local', {
        session: false
    }),
    generateToken
    )
router.put("/admin/user/:id", VerificationUser);

module.exports = {
    routes: router
}