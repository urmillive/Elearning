const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const passport = require('passport');
const jwt = require('jsonwebtoken'); // To generate JWT

//models
const User = require("../models/User");

//controller
const authController = require("../controllers/auth");

router.post(
  "/signup/",
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

// Google OAuth Routes
// Step 1: Redirect to Google to ask for permission
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // Scopes you ask for
    session: false // We are using JWT, not sessions
  })
);

// Step 2: Callback URL after Google has authenticated the user
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL || 'https://elearning-steel-three.vercel.app'}/login?google_auth_failed=true`, // Redirect to client login on failure
    session: false // We are using JWT
  }),
  (req, res) => {
    // Successful authentication, req.user contains the authenticated user from our DB.
    // Generate JWT for this user
    const token = jwt.sign(
      {
        isAdmin: req.user.isAdmin,
        name: req.user.firstName, // Or however you store the name
        _id: req.user._id.toString(),
      },
      process.env.JWT_SECRET || "jO3*iC8&zN4%eB7]rU5#", // Use your JWT secret
      { expiresIn: "1h" }
    );

    // Redirect back to client with the token
    // Client will need to pick this up from URL, store it, and update auth state.
    res.redirect(`${process.env.CLIENT_URL || 'https://elearning-steel-three.vercel.app'}/auth/google/success?token=${token}`);
  }
);

module.exports = router;
