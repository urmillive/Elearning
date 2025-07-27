const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

// Controller
const enrollmentController = require("../controllers/enrollmentController");

// Middleware
const isAuth = require("../middleware/is-auth");

// Validation
const enrollmentValidation = [
  body("courseId").isMongoId().withMessage("Invalid course ID.")
];

const progressValidation = [
  body("completed").optional().isBoolean().withMessage("Completed must be a boolean."),
  body("timeSpent").optional().isNumeric().withMessage("Time spent must be a number."),
  body("notes").optional().isString().trim().withMessage("Notes must be a string.")
];

const ratingValidation = [
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5."),
  body("review").optional().isString().trim().isLength({ min: 10 }).withMessage("Review must be at least 10 characters long.")
];

// Routes
router.post("/enroll", isAuth, enrollmentValidation, enrollmentController.enrollInCourse);
router.get("/my-enrollments", isAuth, enrollmentController.getUserEnrollments);
router.get("/:enrollmentId", isAuth, enrollmentController.getEnrollment);
router.patch("/:enrollmentId/lesson/:moduleId/:lessonId", isAuth, progressValidation, enrollmentController.updateLessonProgress);
router.post("/:enrollmentId/rate", isAuth, ratingValidation, enrollmentController.rateCourse);
router.get("/:courseId/analytics", isAuth, enrollmentController.getCourseAnalytics);

module.exports = router; 