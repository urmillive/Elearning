const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const contactController = require("../controllers/contactController");

// POST /api/contact-query
router.post(
  "/", // Mounted at /api/contact-query or similar in app.js
  [
    body("name").trim().notEmpty().withMessage("Name is required."),
    body("email").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
    body("subject").trim().notEmpty().withMessage("Subject is required."),
    body("message").trim().isLength({ min: 10 }).withMessage("Message must be at least 10 characters long."),
  ],
  contactController.handleContactForm
);

module.exports = router;