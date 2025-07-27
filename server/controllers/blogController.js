const Blog = require("../models/admin/Blog"); // Using the same Blog model

// Get all blogs for public viewing
exports.getPublicBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 }) // Sort by creation date, newest first
      .populate('creator.userId', 'firstName lastName'); // Populate creator's name fields

    // Transform the populated data if necessary, or ensure client expects this structure
    const transformedBlogs = blogs.map(blog => {
      let creatorName = "Anonymous";
      if (blog.creator && blog.creator.userId && (blog.creator.userId.firstName || blog.creator.userId.lastName)) {
        creatorName = `${blog.creator.userId.firstName || ''} ${blog.creator.userId.lastName || ''}`.trim();
      } else if (blog.creator && blog.creator.name) {
        // Fallback if creator.name was directly stored (as per original Blog model)
        creatorName = blog.creator.name;
      }
      return {
        ...blog.toObject(), // Convert Mongoose document to plain object
        creator: { name: creatorName } // Simplify creator info for the card
      };
    });

    if (!transformedBlogs) { // Should check original blogs array if it can be null
      const error = new Error("No blogs found!");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ message: "Blogs fetched successfully!", blogs: transformedBlogs });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Get a single blog by ID for public viewing
exports.getPublicBlogById = async (req, res, next) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId)
      .populate('creator.userId', 'firstName lastName'); // Populate creator's name

    if (!blog) {
      const error = new Error("Blog not found!");
      error.statusCode = 404;
      return next(error);
    }

    // Transform creator info similar to getPublicBlogs
    let creatorName = "Anonymous";
    if (blog.creator && blog.creator.userId && (blog.creator.userId.firstName || blog.creator.userId.lastName)) {
      creatorName = `${blog.creator.userId.firstName || ''} ${blog.creator.userId.lastName || ''}`.trim();
    } else if (blog.creator && blog.creator.name) {
      creatorName = blog.creator.name;
    }
    
    const transformedBlog = {
      ...blog.toObject(),
      creator: { name: creatorName }
    };

    res.status(200).json({ message: "Blog found", blog: transformedBlog });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};