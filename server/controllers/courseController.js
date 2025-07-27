const Course = require("../models/Course");
// Potentially User model if you want to show instructor details not embedded in course
// const User = require("../models/User");

// Get all courses for public viewing
exports.getPublicCourses = async (req, res, next) => {
  try {
    // You might want to select specific fields to return to the public
    // For a list view, you might only populate module names or counts, not full lessons.
    // For now, let's populate modules.
    const courses = await Course.find()
      .populate('modules') // Populate modules
      // .populate('instructor', 'firstName lastName') // Example: if you want instructor name
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Courses fetched successfully!",
      courses: courses,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get a single course by ID for public viewing
exports.getPublicCourseById = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId)
      .populate({
          path: 'modules',
          // options: { sort: { order: 1 } } // If you added an 'order' field to modules
      });
      // .populate('instructor', 'firstName lastName'); // Example
    if (!course) {
      const error = new Error("Course not found!");
      error.statusCode = 404;
      return next(error);
    }
    // Consider what details to send for a single course view,
    // e.g., you might want to populate modules and their lessons here.
    console.log("[Server Log] Fetched public course with populated modules:", JSON.stringify(course, null, 2)); // Added log
    res.status(200).json({ message: "Course found", course: course });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};