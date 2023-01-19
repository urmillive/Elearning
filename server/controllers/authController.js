const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) =>
{
    const userId = req.user.userId; // get userId from req.user
    try
    {
        const user = await User.findById(userId); // get user from database using userId
        // res.json({ user });
        res.send({
            status: true,
            message: "Valid User",
            user: user,
        });
    } catch (error)
    {
        res.status(500).send({ error: error.message });
    }
}

exports.postRegisterUser = (req, res, next) =>
{
    const { firstName, lastName, email, mobile, password } = req.body;
    User.findOne({ email: email }).then((user) =>
    {
        if (user)
        {
            return res.status(404).send({
                message: "User Already Exist",
            });
        } else
        {
            bcrypt.hash(password, 10).then((hashedPassword) =>
            {
                const newUser = new User({
                    firstName,
                    lastName,
                    email,
                    mobile,
                    password: hashedPassword,
                });
                newUser.save().then((savedUser) =>
                {
                    const token = jwt.sign(
                        {
                            userId: savedUser._id,
                            userEmail: savedUser.email,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );
                    res.send({
                        status: true,
                        message: "Registered Successfully",
                        token,
                        user: savedUser,
                    });
                }).catch((err) =>
                {
                    res.status(500).send({
                        message: "Error while Creating user",
                        err,
                    });
                });
            }).catch((err) =>
            {
                res.status(500).send({
                    message: "Error while Hashing Password",
                    err,
                });
            });
        }
    }).catch((err) =>
    {
        res.status(500).send({
            message: "Error while Finding user",
            err,
        });
    });
};


exports.postLoginUser = (req, res, next) =>
{
    const { email, password } = req.body;
    User.findOne({ email })
        .then((user) =>
        {
            if (!user)
            {
                return res.send({
                    status: false,
                    message: "Email not found"
                });
            }

            bcrypt.compare(password, user.password)
                .then((passwordCheck) =>
                {
                    if (!passwordCheck)
                    {
                        return res.send({
                            status: false,
                            message: "Passwords does not match"
                        });
                    }
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );

                    res.send({
                        status: true,
                        message: "Login Successful",
                        user: user,
                        token,
                    });
                })
                .catch((error) =>
                {
                    res.send({
                        status: false,
                        message: "Error while comparing passwords"
                    });
                });
        })
        .catch((err) =>
        {
            res.send({
                status: false,
                message: "Error while finding user",
                err
            });
        });
};
