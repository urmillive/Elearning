const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

//controlller
const blogController = require("../../controllers/admin/blog");

//Authorization
const isAuth = require("../../middleware/is-auth");

//get all blogs
router.get("/", isAuth, blogController.getBlogs);

//get blog of particular user
router.get("/user", isAuth, blogController.getBlogsByUser);

router.get("/:blogId", isAuth, blogController.getBlogById);

//Create blog
router.post(
  "/",
  [
    body("name", "Name should be alphabet").trim().isString(),
    body("summary", "Summary should be in alphabet").trim().isString(),
    body("content", "Content should be string").trim().isString(),
  ],
  isAuth,
  blogController.createBlog
);

//update Blog
router.put(
  "/:blogId",
  [
    body("name", "Name should be alphabet").trim().isString(),
    body("summary", "Summary should be in alphabet").trim().isString(),
    body("content", "Content should be string").trim().isString(),
  ],
  isAuth,
  blogController.updateBlog
);

//Delete a blog
router.delete("/:blogId", isAuth, blogController.deleteBlog);

module.exports = router;
