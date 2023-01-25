const express = require("express");
const router = express.Router();

//model
const User = require("../../models/User");

//userhandler controller
const userHandlerController = require("../../controllers/admin/userController");

//authorization
const isAuth = require("../../middleware/is-auth");

//get all users
router.get("/", isAuth, userHandlerController.getAllUsers);

//get particular user
router.get("/:userId", isAuth, userHandlerController.getUserById);

//set or remove user admin
router.patch("/:userId", isAuth, userHandlerController.manageUserAdmin);

//delete user
router.delete("/:userId", isAuth, userHandlerController.deleteUser);

module.exports = router;
