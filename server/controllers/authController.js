const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getUser = (req, res, next) =>
{
    return req.user;
}


exports.postRegisterUser = (req, res, next) =>
{
    const { firstName, lastName, email, mobile, password } = req.body;
    User.findOne({ email: email }).then((user) =>
    {
        if (user)
        {
            return res.status(404).send({
                message: "User Already Exist"
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
                        { expiresIn: "24h" }
                    );
                    res.status(201).send({
                        message: "Registered Successfully",
                        data: {
                            token,
                            user: savedUser,
                        },
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
    console.log(email, password);
    User.findOne({ email })
        .then((user) =>
        {
            if (!user)
            {
                return res.status(404).send({
                    message: "Email not found"
                });
            }

            bcrypt.compare(password, user.password)
                .then((passwordCheck) =>
                {
                    if (!passwordCheck)
                    {
                        return res.status(400).send({
                            message: "Passwords does not match"
                        });
                    }
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h" }
                    );

                    res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                .catch((error) =>
                {
                    res.status(400).send({
                        message: "Error while comparing passwords"
                    });
                });
        })
        .catch((err) =>
        {
            res.status(500).send({
                message: "Error while finding user",
                err
            });
        });
};
