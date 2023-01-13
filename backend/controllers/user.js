const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.postRegisterUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPassword) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: hashedPassword,
      });

      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "Registered Successfully",
            result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error while creating user",
            err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Something went wrong!",
        err,
      });
    });
};

exports.postLoginUser = (req, res, next) => {
  // check if email exists
  User.findOne({ email: req.body.email })
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
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
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((err) => {
      res.status(404).send({
        message: "Email not found",
        err,
      });
    });
};
