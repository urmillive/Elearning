const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

router.route("/").get(instructorController.getAllInstructors).post(instructorController.createInstructor);

router
    .route("/:id")
    .get(instructorController.getInstructorById)
    .put(instructorController.updateInstructor)
    .delete(instructorController.deleteInstructor);

module.exports = router;
