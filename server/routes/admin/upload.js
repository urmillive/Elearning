const express = require("express");
const router = express.Router();

// Controller
const uploadController = require("../../controllers/admin/uploadController");

// Middleware
const isAuth = require("../../middleware/is-auth");
const isAdmin = require("../../middleware/is-admin");

// POST /admin/uploads/video - Handles video file uploads
// Assumes Multer middleware is already configured globally in app.js for field name 'file'
router.post("/video", isAuth, isAdmin, uploadController.handleVideoUpload);

module.exports = router;