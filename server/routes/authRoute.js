const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const userAuthMiddleware = require("../middlewares/userAuthMiddleware.js");

router.post("/register", authController.postRegisterUser);
router.post("/login", authController.postLoginUser);
router.get("/getUser", userAuthMiddleware, authController.getUser);

module.exports = router;
