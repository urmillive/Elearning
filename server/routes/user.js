const express = require("express");
const router = express.Router();

//Controller
const userController = require("../controllers/userController");

//Authorization
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, userController.getUser);

router.post("/", isAuth, userController.saveUser);

module.exports = router;
