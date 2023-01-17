const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

router.post("/register", authController.postRegisterUser);
router.post("/login", authController.postLoginUser);
router.post("/getUser", authController.getUser);

module.exports = router;
