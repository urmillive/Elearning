const User = require("../../models/User");

exports.getAllUsers = (req, res) =>
{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.createUser = (req, res) =>
{
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    newUser
        .save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: " + err));
};

exports.updateUser = (req, res) =>
{
    User.findById(req.params.id)
        .then(user =>
        {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;

            user
                .save()
                .then(() => res.json("User updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error: " + err));
};

exports.deleteUser = (req, res) =>
{
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({
            status: true,
            data: {
                message: "User deleted."
            }
        }))
        .catch(err => res.status(400).json("Error: " + err));
};
