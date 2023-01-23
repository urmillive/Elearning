const express = require("express");
const router = express.Router();

//models
const Profile = require("../models/Profile");
const User = require("../models/User");

//Controller
const profileController = require("../controllers/profile");

//Authorization
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, profileController.getProfile);

router.put("/profile", isAuth, profileController.createProfile);

module.exports = router;
