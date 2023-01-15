const Instructor = require("../models/instructor");

exports.getAllInstructors = (req, res) =>
{
    Instructor.find()
        .then(instructors => res.json(instructors))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.getInstructorById = (req, res) =>
{
    Instructor.findById(req.params.id)
        .then(instructor => res.json(instructor))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.createInstructor = (req, res) =>
{
    const newInstructor = new Instructor({
        name: req.body.name,
        bio: req.body.bio,
        photo: req.body.photo
    });

    newInstructor
        .save()
        .then(() => res.json("Instructor added!"))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.updateInstructor = (req, res) =>
{
    Instructor.findById(req.params.id)
        .then(instructor =>
        {
            instructor.name = req.body.name;
            instructor.bio = req.body.bio;
            instructor.photo = req.body.photo;

            instructor
                .save()
                .then(() => res.json("Instructor updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
};

exports.deleteInstructor = (req, res) =>
{
    Instructor.findByIdAndDelete(req.params.id)
        .then(() => res.json("Instructor deleted."))
        .catch(err => res.status(400).json("Error: " + err));
};

