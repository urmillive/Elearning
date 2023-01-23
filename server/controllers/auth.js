const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//models
const User = require("../models/User");
const Profile = require("../models/Profile");

exports.signUp = async (req, res, next) =>
{
  const errors = validationResult(req);

  if (!errors.isEmpty())
  {
    const error = new Error("Validation Failed, Please try again!");
    error.statusCode = 422;
    error.message = errors.array()[ 0 ].msg;
    error.data = errors.array();
    return next(error);
  }

  try
  {
    const { firstName, lastName, email, contactNumber, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
    });

    const createdUser = await user.save();
    const createProfile = new Profile({
      user: createdUser._id,
    });

    const createdProfile = await createProfile.save();
    createdUser.profile = createdProfile._id;
    await createdUser.save();
    res.status(200).json({ message: "Signup Successfully done", user: createdUser });
  } catch (error)
  {
    error.statusCode = 500;
    next(error);
  }
};

exports.login = async (req, res, next) =>
{
  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    const error = new Error("Validation Failed, Please try again!");
    error.statusCode = 422;
    error.message = errors.array()[ 0 ].msg;
    error.data = errors.array();
    return next(error);
  }

  const { email, password } = req.body;
  console.log(req.body);

  try
  {
    const user = await User.findOne({ email: email });
    if (!user)
    {
      const error = new Error("Please enter a valid email address");
      error.statusCode = 404;
      return next(error);
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual)
    {
      const error = new Error("Invalid email or password!");
      error.statusCode = 400;
      return next(error);
    }

    const token = jwt.sign(
      {
        isAdmin: user.isAdmin,
        name: user.firstName,
        _id: user._id.toString(),
      },
      "jO3*iC8&zN4%eB7]rU5#",
      { expiresIn: "1h" }
    );

    res.status(200).json({ token: token, user: user, message: "Login Successfully done" });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
      next(error);
    }
  }
};


