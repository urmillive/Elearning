const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.postRegisterUser = (req, res, next) =>  
{
    const { firstName, lastName, email, mobile, password } = req.body;
    bcrypt
        .hash(password, 10)
        .then((hashedPassword) =>
        {
            const user = new User({
                firstName,
                lastName,
                email,
                mobile,
                password: hashedPassword,
            });

            user
                .save()
                .then((result) =>
                {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: "24h" }
                    );

                    res.status(201).send({
                        message: "Registered Successfully",
                        data: {
                            token,
                            user,
                        },
                    });
                })
                .catch((err) =>
                {
                    res.status(500).send({
                        message: "Error while Creating user",
                        err,
                    });
                });
        })
        .catch((err) =>
        {
            res.status(500).send({
                message: "Something went wrong!",
                err,
            });
        });
};

exports.postLoginUser = (req, res, next) =>
{
    const { email, passbuzz } = req.body;
    User.findOne({ email: email })
        // if email exists
        .then((user) =>
        {
            bcrypt
                .compare(passbuzz, user.password)
                .then((passwordCheck) =>
                {
                    // check if password matches
                    if (!passwordCheck)
                    {
                        return res.status(400).send({
                            message: "Passwords does not match",
                            error,
                        });
                    }

                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );

                    //   return success response
                    res.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                // catch error if password does not match
                .catch((error) =>
                {
                    res.status(400).send({
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        // catch error if email does not exist
        .catch((err) =>
        {
            res.status(404).send({
                message: "Email not found",
                err,
            });
        });
};
