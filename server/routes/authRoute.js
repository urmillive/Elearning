const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const userAuthMiddleware = require("../middleware/userAuthMiddleware.js");

router.post("/register", authController.postRegisterUser);
router.post("/login", authController.postLoginUser);
router.post("/getUser", userAuthMiddleware, authController.getUser);

module.exports = router;
