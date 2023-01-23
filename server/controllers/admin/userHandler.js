//model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

exports.getAllUsers = async (req, res, next) =>
{
  if (!req.isAdmin)
  {
    const error = new Error("Not Authorized!");
    error.statusCode = 401;
    return next(error);
  }

  try
  {
    const users = await User.find().populate("profile");
    if (!users)
    {
      const error = new Error("User Not Found!");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: "User found", users: users });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUserById = async (req, res, next) =>
{
  const { userId } = req.params;
  let userData;
  try
  {
    const profile = await Profile.findOne({ user: userId }).populate(
      "user",
      "-password"
    );
    if (!profile)
    {
      const error = new Error("User does not found!");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: "User Found!", user: profile });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.manageUserAdmin = async (req, res, next) =>
{
  if (!req.isAdmin)
  {
    const error = new Error("Not Authorized!");
    error.statusCode = 401;
    return next(error);
  }
  const { userId } = req.params;
  try
  {
    const user = await User.findOne({ _id: userId });
    if (!user)
    {
      const error = new Error("User not Exist!");
      error.statusCode = 404;
      return next(error);
    }
    if (user.isAdmin)
    {
      user.isAdmin = false;
    } else
    {
      user.isAdmin = true;
    }
    const updatedUser = await user.save();
    res.status(200).json({ message: `User admin is ${ updatedUser.isAdmin }` });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteUser = async (req, res, next) =>
{
  if (!req.isAdmin)
  {
    const error = new Error("Not Authorized!");
    error.statusCode = 404;
    return next(error);
  }
  const { userId } = req.params;
  try
  {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (!deletedUser)
    {
      const error = new Error("Something went wrong while deleting!");
      error.statusCode = 404;
      return next(error);
    }
    res
      .status(200)
      .json({ message: "User Deleted Successfully!", deletedUser });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};
