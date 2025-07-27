const express = require("express");
const router = express.Router();

// Public Course Controller
const publicCourseController = require("../controllers/courseController");

// GET /courses - Get all courses for public viewing
router.get("/", publicCourseController.getPublicCourses);

// GET /courses/:courseId - Get a single course by ID for public viewing
router.get("/:courseId", publicCourseController.getPublicCourseById);

module.exports = router;