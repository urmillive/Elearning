const express = require("express");
const router = express.Router();

//model
const User = require("../../models/User");

//userhandler controller
const userHandlerController = require("../../controllers/admin/userController");

//authorization
const isAuth = require("../../middleware/is-auth");
const isAdmin = require("../../middleware/is-admin");

//get all users
router.get("/", isAuth, isAdmin, userHandlerController.getAllUsers);

//get particular user
router.get("/:userId", isAuth, isAdmin, userHandlerController.getUserById);

//set or remove user admin
router.patch("/:userId", isAuth, isAdmin, userHandlerController.manageUserAdmin);

//delete user
router.delete("/:userId", isAuth, isAdmin, userHandlerController.deleteUser);

module.exports = router;
