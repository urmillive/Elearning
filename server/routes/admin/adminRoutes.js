// const express = require("express");
// const router = express.Router();
// const coursesController = require("../controllers/admin/coursesController");
// const instructorsController = require("../controllers/admin/instructorsController");
// const usersController = require("../controllers/admin/usersController");
// const authMiddleware = require("../middlewares/adminAuthMiddleware.js");

// // Use the auth middleware for all routes in this file
// router.use(authMiddleware);

// // Course routes
// router.get("/courses", coursesController.index);
// router.get("/courses/new", coursesController.new);
// router.post("/courses", coursesController.create);
// router.get("/courses/:id/edit", coursesController.edit);
// router.put("/courses/:id", coursesController.update);
// router.delete("/courses/:id", coursesController.delete);

// // Instructor routes
// router.get("/instructors", instructorsController.index);
// router.get("/instructors/new", instructorsController.new);
// router.post("/instructors", instructorsController.create);
// router.get("/instructors/:id/edit", instructorsController.edit);
// router.put("/instructors/:id", instructorsController.update);
// router.delete("/instructors/:id", instructorsController.delete);

// // User routes
// router.get("/users", usersController.index);
// router.get("/users/:id/edit", usersController.edit);
// router.put("/users/:id", usersController.update);
// router.delete("/users/:id", usersController.delete);

// module.exports = router;
