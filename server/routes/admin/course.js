const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

// Controller
const courseController = require("../../controllers/admin/courseController");

// Middleware
const isAuth = require("../../middleware/is-auth");
const isAdmin = require("../../middleware/is-admin");

// Validation for course creation and update
const courseValidation = [
  body("name").trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters long."),
  body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters long."),
  body("duration").isNumeric({ no_symbols: true }).withMessage("Duration must be a positive number.").toFloat(),
  body("price").isNumeric({ no_symbols: true }).withMessage("Price must be a positive number.").toFloat(),
  body("category").optional().trim().isString(),
  body("imageUrl").optional().trim().isURL().withMessage("Image URL must be a valid URL."),
  body("instructor").optional().isMongoId().withMessage("Invalid instructor ID."), // If instructor is an ID
  body("tags").optional().isArray().withMessage("Tags must be an array."),
  body("tags.*").optional().trim().isString().withMessage("Each tag must be a string."), // Validate each item in tags array
  body("skillLevel").optional().isIn(['Beginner', 'Intermediate', 'Advanced', 'All Levels']).withMessage("Invalid skill level."),
  body("language").optional().trim().isString(),
  // Validation for modules and lessons would be more complex and might involve custom validators
  // For example, checking if 'modules' is an array, and each element has required 'name' and 'lessons' array, etc.
  // body("modules").optional().isArray().withMessage("Modules must be an array."),
  // body("modules.*.name").exists({ checkFalsy: true }).trim().isString().withMessage("Each module must have a name."),
  // body("modules.*.lessons").optional().isArray().withMessage("Lessons for each module must be an array."),
  // body("modules.*.lessons.*.title").exists({ checkFalsy: true }).trim().isString().withMessage("Each lesson must have a title.")
];

// GET /admin/courses - Get all courses
router.get("/", isAuth, isAdmin, courseController.getCourses);

// POST /admin/courses - Create a new course
router.post("/", isAuth, isAdmin, courseValidation, courseController.createCourse);

// GET /admin/courses/:courseId - Get a single course by ID
router.get("/:courseId", isAuth, isAdmin, courseController.getCourseById);

// PUT /admin/courses/:courseId - Update an existing course
router.put("/:courseId", isAuth, isAdmin, courseValidation, courseController.updateCourse);

// DELETE /admin/courses/:courseId - Delete a course
router.delete("/:courseId", isAuth, isAdmin, courseController.deleteCourse);

module.exports = router;