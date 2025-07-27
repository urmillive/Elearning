const { validationResult } = require("express-validator");
const Course = require("../../models/Course");
// Potentially Module model if we need to interact with modules directly during course creation/update
const Module = require("../../models/Module"); // Uncommented and assuming we might manage modules here

exports.createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, please enter valid data.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const {
    name,
    description,
    duration,
    price,
    category,
    imageUrl,
    instructor, // Assuming instructor ID is passed
    tags,
    skillLevel,
    language,
    modules // This will be more complex to handle, see notes below
  } = req.body;

  try {
    // For now, modules handling is simplified.
    // In a real scenario, you might create Module documents separately
    // and then push their IDs to the course.modules array.
    // Or, if modules are sent as full objects, you might create them here.
    // This example assumes 'modules' is an array of Module IDs for simplicity if pre-existing.
    // Or, if creating modules on the fly, this part needs significant expansion.

    const courseData = {
      name,
      description,
      duration,
      price,
      category,
      imageUrl,
      tags: tags || [],
      skillLevel,
      language,
      enrolledUsers: [], // Initially no one is enrolled
      // modules: modules || [] // Placeholder for module IDs
    };
    if (instructor) { // Add instructor only if provided
        courseData.instructor = instructor;
    }
    
    const course = new Course(courseData);

    // TODO: Advanced module/lesson creation logic will go here.
    // If `req.body.modules` contains full module and lesson data:
    // 1. Iterate through `req.body.modules`.
    // 2. For each module object:
    //    a. Create `Lesson` sub-documents from `module.lessons`.
    //    b. Create a new `Module` document with these lessons and other module data,
    //       associating it with the `course._id` (once the course is saved or by generating an ID).
    //    c. Collect the IDs of these newly created `Module` documents.
    // 3. Set `course.modules` to the array of collected Module IDs before saving the course,
    //    or save the course first, then create modules referencing course._id, then update course.modules.

    const newCourse = new Course(courseData);
    const savedCourse = await newCourse.save(); // Save course first to get its _id

    if (modules && Array.isArray(modules) && modules.length > 0) {
      const createdModuleIds = [];
      for (const moduleData of modules) {
        const newModule = new Module({
          ...moduleData, // name, description, lessons (lessons are subdocs, so they'll be created)
          course: savedCourse._id, // Link to the parent course
        });
        const savedModule = await newModule.save();
        createdModuleIds.push(savedModule._id);
      }
      savedCourse.modules = createdModuleIds; // Assign the array of Module ObjectIds
      await savedCourse.save(); // Save the course again with module references
    }
    
    // Repopulate to send the full course object back
    const populatedCourse = await Course.findById(savedCourse._id).populate('modules');

    res.status(201).json({
      message: "Course created successfully!",
      course: populatedCourse, // Send back the populated course
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find(); // .populate('modules'); // if you want to populate module details
    res.status(200).json({
      message: "Fetched courses successfully.",
      courses: courses,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Get a single course by ID, populating modules (and their lessons, as they are subdocuments)
exports.getCourseById = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId).populate('modules'); // Populate modules
    if (!course) {
      const error = new Error("Could not find course.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Course fetched.", course: course });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Placeholder for updateCourse
exports.updateCourse = async (req, res, next) => {
  const { courseId } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, please enter valid data.");
    error.statusCode = 422;
    error.data = errors.array();
    return next(error);
  }

  const {
    name,
    description,
    duration,
    price,
    category,
    imageUrl,
    instructor,
    tags,
    skillLevel,
    language,
    modules // Similar complexity as in createCourse for handling modules/lessons
  } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error("Could not find course.");
      error.statusCode = 404;
      throw error; // Use return next(error) for consistency if preferred
    }

    course.name = name || course.name;
    course.description = description || course.description;
    course.duration = duration || course.duration;
    course.price = price || course.price;
    course.category = category || course.category;
    course.imageUrl = imageUrl || course.imageUrl;
    course.instructor = instructor || course.instructor; // Handle null/undefined carefully if clearing
    course.tags = tags || course.tags;
    course.skillLevel = skillLevel || course.skillLevel;
    course.language = language || course.language;

    // --- Handle Modules and Lessons (Simpler "replace" strategy for now) ---
    if (modules && Array.isArray(modules)) {
      // 1. Delete existing modules associated with this course.
      // Note: This also deletes their sub-document lessons.
      // Consider if you need to handle orphaned Module documents if the client sends an empty modules array
      // intending to clear them, versus not sending the 'modules' key at all to leave them untouched.
      await Module.deleteMany({ course: course._id });

      // 2. Create new modules from the request data
      const newModuleIds = [];
      for (const moduleData of modules) {
        // Ensure lessons are an array, even if moduleData.lessons is undefined
        const lessonsData = Array.isArray(moduleData.lessons) ? moduleData.lessons : [];
        const newModule = new Module({
          name: moduleData.name,
          description: moduleData.description,
          lessons: lessonsData, // lessons are subdocs and will be created with the module
          course: course._id, // Link to the parent course
          order: moduleData.order // Assuming order is passed from client
        });
        const savedModule = await newModule.save();
        newModuleIds.push(savedModule._id);
      }
      course.modules = newModuleIds; // Assign the new array of Module ObjectIds
    } else if (req.body.hasOwnProperty('modules') && (!modules || modules.length === 0)) {
      // If 'modules' key is explicitly sent as null or empty array, clear existing modules.
      await Module.deleteMany({ course: course._id });
      course.modules = [];
    }
    // If 'modules' key is not in req.body at all, existing course.modules are untouched by this block.
    
    const savedCourse = await course.save();
    
    // Repopulate to send the full course object back
    const populatedCourse = await Course.findById(savedCourse._id).populate('modules');

    res.status(200).json({ message: "Course updated!", course: populatedCourse });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// Placeholder for deleteCourse
exports.deleteCourse = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      const error = new Error("Could not find course.");
      error.statusCode = 404;
      throw error;
    }
    // Add any pre-deletion logic here (e.g., remove from user profiles, delete associated modules if owned by course)
    await Course.findByIdAndDelete(courseId);
    res.status(200).json({ message: "Course deleted." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};