const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

//models
const User = require("../models/User");

//controller
const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("firstName", "First name should be alphabet!").isString().trim(),
    body("lastName", "Last name should be alphabet!").isString().trim(),
    body("email", "Please enter a valid email address")
      .isEmail()
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              "Email already exist! Please pick a different one"
            );
          }
        });
      }),
    body("contactNumber", "Please enter a valid number")
      .isNumeric()
      .custom(async (value, { req }) => {
        const user = await User.findOne({ contactNumber: value });
        if (user) {
          return Promise.reject("Contact number already exist!");
        }
      }),
    body("password", "Please enter a valid password!")
      .isLength({ min: 8 })
      .isAlphanumeric(),
  ],
  authController.signUp
);

router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail().trim(),
    body("password").isLength({ min: 8 }).isAlphanumeric(),
  ],
  authController.login
);

module.exports = router;
