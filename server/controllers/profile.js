//models
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.getUser = async (req, res, next) =>
{
  const { userId } = req;
  try
  {
    const user = await User.findOne({ _id: userId });
    if (!user
    )
    {
      const error = new Error("Something Went Wrong!");
      error.statusCode = 404;
      return next(error);
    }
    res
      .status(200)
      .json({ message: "User profile fetched!", user: user });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.saveUser = async (req, res, next) =>
{
  let imageUrl;
  try
  {
    const user = await User.findOne({ _id: req.userId });
    if (req.file)
    {
      imageUrl = req.file.path.replace(/\\/g, "/");
    } else
    {
      imageUrl = user.profile;
    }

    if (!imageUrl)
    {
      const error = new Error("Please provide an image");
      error.statusCode = 422;
      return next(error);
    }

    user.profile = imageUrl;

    await user.save();
    res.status(200).json({
      message: "Profile Updated Successfully",
      user: user,
    });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};
