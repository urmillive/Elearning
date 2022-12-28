const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// For registering an user
router.post("/register", userController.postRegisterUser);

// For logging in

router.post("/login", userController.postLoginUser);

exports.routes = router;
