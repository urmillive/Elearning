const { validationResult } = require("express-validator");

//models
const Blog = require("../../models/admin/Blog");
const { findOne } = require("../../models/Profile");

exports.getBlogs = async (req, res, next) =>
{
  try
  {
    const blogs = await Blog.find({
      "creator.userId": req.userId,
    });
    if (!blogs)
    {
      const error = new Error("Blogs not found!");
      error.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ message: "Blogs Found!", blogs: blogs });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createBlog = async (req, res, next) =>
{
  if (!req.isAdmin)
  {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    const error = new Error("Validation Failed, Please try again!");
    error.statusCode = 422;
    error.message = errors.array()[ 0 ].msg;
    error.data = errors.array();
    return next(error);
  }
  const { name, summary, content } = req.body;
  console.log(req.body);
  try
  {
    const blog = new Blog({
      creator: {
        name: req.userName,
        userId: req.userId,
      },
      name,
      summary,
      content,
    });

    const createdBlog = await blog.save();
    res.status(200).json({ message: "Blog Created!", blog: createdBlog });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getBlogById = async (req, res, next) =>
{
  const { blogId } = req.params;
  try
  {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog)
    {
      const error = new Error("Blog not found!");
      error.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ message: "Blog Found", blog: blog });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getBlogsByUser = async (req, res, next) =>
{
  if (!req.isAdmin)
  {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    return next(error);
  }

  try
  {
    const userBlog = await Blog.find({ "creator.userId": req.userId });

    if (!userBlog)
    {
      const error = new Error("Blog not found!");
      error.statusCode = 404;
      return next(err);
    }
    res.status(200).json({ message: "User Blog Found!", userBlog: userBlog });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateBlog = async (req, res, next) =>
{
  if (!req.isAdmin)
  {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty())
  {
    const error = new Error("Validation Failed, Please try again!");
    error.statusCode = 422;
    error.message = errors.array()[ 0 ].msg;
    error.data = errors.array();
    return next(error);
  }

  const { blogId } = req.params;
  const { name, summary, content } = req.body;
  try
  {
    const blog = await Blog.findOne({
      _id: blogId,
      "creator.userId": req.userId,
    });
    if (!blog)
    {
      const error = new Error("Blogs not found!");
      error.statusCode = 404;
      return next(error);
    }
    blog.name = name;
    blog.summary = summary;
    blog.content = content;
    const updatedBlog = await blog.save();
    res.status(200).json({ message: "Blog Updated!", blog: updatedBlog });
  } catch (error)
  {
    if (!error.statusCode)
    {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteBlog = async (req, res, next) =>
{
  if (!req.isAdmin)
  {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    return next(error);
  }
  const { blogId } = req.params;

  try
  {
    const deletedBlog = await Blog.findOneAndDelete({
      _id: blogId,
      "creator.userId": req.userId,
    });
    if (!deletedBlog)
    {
      const error = new Error("Error while deleting blog!");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "Blog Deleted Successfully!",
      deletedBlog: deletedBlog,
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
