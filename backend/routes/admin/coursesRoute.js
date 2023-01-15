// routes/courses.js
const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController.js");

// GET all courses
router.get("/", courseController.getAllCourses);

// GET a specific course by id
router.get("/:id", courseController.getCourseById);

// POST a new course
router.post("/", courseController.createCourse);

// PUT (update) a specific course by id
router.put("/:id", courseController.updateCourse);

// DELETE a specific course by id
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
