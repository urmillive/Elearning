//models
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.getProfile = async (req, res, next) =>
{
  const { userId } = req;
  try
  {
    const profile = await Profile.findOne({ user: userId })
      .select("-password")
      .populate("user");

    if (!profile)
    {
      const error = new Error("Something Went Wrong!");
      error.statusCode = 404;
      return next(error);
    }
    res
      .status(200)
      .json({ message: "User profile fetched!", profile: profile });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createProfile = async (req, res, next) =>
{
    // const { userId } = req.params;
  const { location, about } = req.body;
  let imageUrl;
  try
  {
    const profile = await Profile.findOne({ user: req.userId });
    if (!profile)
    {
      const error = new Error("Something went wrong!");
      error.statusCode = 400;
      return next(error);
    }

    if (req.file)
    {
      imageUrl = req.file.path.replace(/\\/g, "/");
    } else
    {
      imageUrl = profile.imageUrl;
    }

    if (!imageUrl)
    {
      const error = new Error("Please provide an image");
      error.statusCode = 422;
      return next(error);
    }

    profile.imageUrl = imageUrl;
    profile.location = location;
    profile.about = about;
    profile.user = req.userId;

    const createdProfile = await profile.save();
    res.status(200).json({
      message: "Profile Updated Successfully",
      profile: createdProfile,
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
