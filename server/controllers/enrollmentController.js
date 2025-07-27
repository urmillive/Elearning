const { validationResult } = require("express-validator");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");

// Enroll in a course
exports.enrollInCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const { courseId } = req.body;
  const userId = req.userId;

  try {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error("Course not found!");
      error.statusCode = 404;
      return next(error);
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (existingEnrollment) {
      const error = new Error("Already enrolled in this course!");
      error.statusCode = 400;
      return next(error);
    }

    // Create enrollment
    const enrollment = new Enrollment({
      user: userId,
      course: courseId,
      status: 'active'
    });

    // Initialize lesson progress for all lessons in the course
    const lessonProgress = [];
    for (const module of course.modules) {
      const populatedModule = await Course.findById(courseId)
        .populate({
          path: 'modules',
          match: { _id: module }
        });
      
      if (populatedModule.modules[0] && populatedModule.modules[0].lessons) {
        for (const lesson of populatedModule.modules[0].lessons) {
          lessonProgress.push({
            lesson: lesson._id,
            module: module,
            completed: false,
            timeSpent: 0
          });
        }
      }
    }

    enrollment.lessonProgress = lessonProgress;
    await enrollment.save();

    // Populate course and user details
    const populatedEnrollment = await Enrollment.findById(enrollment._id)
      .populate('course')
      .populate('user', 'firstName lastName email');

    res.status(201).json({
      message: "Successfully enrolled in course!",
      enrollment: populatedEnrollment
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get user enrollments
exports.getUserEnrollments = async (req, res, next) => {
  const userId = req.userId;

  try {
    const enrollments = await Enrollment.find({ user: userId })
      .populate('course')
      .populate('user', 'firstName lastName email')
      .sort({ lastAccessed: -1 });

    res.status(200).json({
      message: "Enrollments fetched successfully!",
      enrollments: enrollments
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get specific enrollment with progress
exports.getEnrollment = async (req, res, next) => {
  const { enrollmentId } = req.params;
  const userId = req.userId;

  try {
    const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: userId })
      .populate('course')
      .populate({
        path: 'course',
        populate: {
          path: 'modules',
          populate: {
            path: 'lessons'
          }
        }
      });

    if (!enrollment) {
      const error = new Error("Enrollment not found!");
      error.statusCode = 404;
      return next(error);
    }

    // Update last accessed
    enrollment.lastAccessed = new Date();
    await enrollment.save();

    res.status(200).json({
      message: "Enrollment fetched successfully!",
      enrollment: enrollment
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Update lesson progress
exports.updateLessonProgress = async (req, res, next) => {
  const { enrollmentId, lessonId, moduleId } = req.params;
  const { completed, timeSpent, notes } = req.body;
  const userId = req.userId;

  try {
    const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: userId });
    if (!enrollment) {
      const error = new Error("Enrollment not found!");
      error.statusCode = 404;
      return next(error);
    }

    // Find and update lesson progress
    const lessonProgress = enrollment.lessonProgress.find(
      lp => lp.lesson.toString() === lessonId && lp.module.toString() === moduleId
    );

    if (!lessonProgress) {
      const error = new Error("Lesson progress not found!");
      error.statusCode = 404;
      return next(error);
    }

    // Update progress
    if (completed !== undefined) {
      lessonProgress.completed = completed;
      if (completed) {
        lessonProgress.completedAt = new Date();
      }
    }

    if (timeSpent !== undefined) {
      lessonProgress.timeSpent += timeSpent;
      enrollment.totalTimeSpent += timeSpent / 60; // Convert to minutes
    }

    if (notes !== undefined) {
      lessonProgress.notes = notes;
    }

    lessonProgress.lastAccessed = new Date();
    enrollment.lastAccessed = new Date();

    // Calculate overall progress
    enrollment.progress = enrollment.calculateProgress();

    // Check if course is completed
    if (enrollment.progress === 100 && enrollment.status === 'active') {
      enrollment.status = 'completed';
      enrollment.completedAt = new Date();
    }

    await enrollment.save();

    res.status(200).json({
      message: "Progress updated successfully!",
      enrollment: enrollment
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Rate and review course
exports.rateCourse = async (req, res, next) => {
  const { enrollmentId } = req.params;
  const { rating, review } = req.body;
  const userId = req.userId;

  try {
    const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: userId });
    if (!enrollment) {
      const error = new Error("Enrollment not found!");
      error.statusCode = 404;
      return next(error);
    }

    if (enrollment.status !== 'completed') {
      const error = new Error("Can only rate completed courses!");
      error.statusCode = 400;
      return next(error);
    }

    enrollment.rating = rating;
    enrollment.review = review;
    enrollment.reviewDate = new Date();

    await enrollment.save();

    res.status(200).json({
      message: "Course rated successfully!",
      enrollment: enrollment
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get course analytics
exports.getCourseAnalytics = async (req, res, next) => {
  const { courseId } = req.params;
  const userId = req.userId;

  try {
    const enrollment = await Enrollment.findOne({ user: userId, course: courseId });
    if (!enrollment) {
      const error = new Error("Enrollment not found!");
      error.statusCode = 404;
      return next(error);
    }

    const analytics = {
      totalLessons: enrollment.lessonProgress.length,
      completedLessons: enrollment.lessonProgress.filter(lp => lp.completed).length,
      progress: enrollment.progress,
      totalTimeSpent: enrollment.totalTimeSpent,
      averageTimePerLesson: enrollment.lessonProgress.length > 0 
        ? enrollment.totalTimeSpent / enrollment.lessonProgress.length 
        : 0,
      lastAccessed: enrollment.lastAccessed,
      enrollmentDate: enrollment.enrolledAt,
      status: enrollment.status
    };

    res.status(200).json({
      message: "Analytics fetched successfully!",
      analytics: analytics
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}; 