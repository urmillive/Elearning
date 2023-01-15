// controllers/courseController.js
const Course = require("../../extra/course");

exports.getAllCourses = (req, res) =>
{
    Course.find()
        .then(courses => res.json(courses))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.getCourseById = (req, res) =>
{
    Course.findById(req.params.id)
        .then(course => res.json(course))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.createCourse = (req, res) =>
{
    const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        instructor: req.body.instructor,
        duration: req.body.duration,
        level: req.body.level
    });

    newCourse
        .save()
        .then(() => res.json("Course added!"))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.updateCourse = (req, res) =>
{
    Course.findById(req.params.id)
        .then(course =>
        {
            course.title = req.body.title;
            course.description = req.body.description;
            course.price = req.body.price;
            course.instructor = req.body.instructor;
            course.duration = req.body.duration;
            course.level = req.body.level;

            course
                .save()
                .then(() => res.json("Course updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
};

exports.deleteCourse = (req, res) =>
{
    Course.findByIdAndDelete(req.params.id)
        .then(() => res.json("Course deleted."))
        .catch(err => res.status(400).json("Error: " + err));
};
