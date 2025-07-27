const express = require("express");
const router = express.Router();

// Public Blog Controller
const publicBlogController = require("../controllers/blogController");

// GET /blogs - Get all blogs for public viewing
router.get("/", publicBlogController.getPublicBlogs);

// GET /blogs/:blogId - Get a single blog by ID for public viewing
router.get("/:blogId", publicBlogController.getPublicBlogById);

module.exports = router;