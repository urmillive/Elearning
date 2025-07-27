const express = require("express");
const router = express.Router();

//Controller
const userController = require("../controllers/profile");

//Authorization
const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, userController.getUser);

router.post("/", isAuth, userController.saveUser);

// Route for avatar upload
// Assumes global Multer middleware in app.js handles `single('file')`
router.post("/avatar", isAuth, userController.updateUserAvatar);

module.exports = router;
