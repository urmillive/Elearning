const Enrollment = require("../../extra/enrollment");

exports.getAllEnrollments = (req, res) =>
{
    Enrollment.find()
        .then(enrollments => res.json(enrollments))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.createEnrollment = (req, res) =>
{
    const newEnrollment = new Enrollment({
        user: req.body.user,
        course: req.body.course
    });

    newEnrollment
        .save()
        .then(() => res.json("Enrollment added!"))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.deleteEnrollment = (req, res) =>
{
    Enrollment.findByIdAndDelete(req.params.id)
        .then(() => res.json("Enrollment deleted."))
        .catch(err => res.status(400).json("Error: " + err));
};
