//models
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

exports.updateUserAvatar = async (req, res, next) => {
  if (!req.file) {
    const error = new Error("No image file provided.");
    error.statusCode = 422;
    return next(error);
  }

  // The global Multer middleware in app.js saves to public/images
  // and req.file.filename will have the generated filename.
  const imageUrl = `/public/images/${req.file.filename}`;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      return next(error);
    }

    user.profile = imageUrl; // Save the public path to the profile field
    // If you decide to use profilePicUrl for uploaded avatars as well:
    // user.profilePicUrl = imageUrl;
    
    await user.save();

    res.status(200).json({
      message: "Avatar updated successfully.",
      profilePath: imageUrl,
      user: { // Send back minimal user info or updated user object
        _id: user._id,
        profile: user.profile,
        profilePicUrl: user.profilePicUrl
      }
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
