const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

//controlller
const blogController = require("../../controllers/admin/blog");

//Authorization
const isAuth = require("../../middleware/is-auth");
const isAdmin = require("../../middleware/is-admin"); // Import the new middleware

//get all blogs - Assuming this should be admin-only
router.get("/", isAuth, isAdmin, blogController.getBlogs);

//get blog of particular user - This might be for any authenticated user, or admin only.
// If for any authenticated user, isAdmin is not needed. If admin only, add isAdmin.
// For now, I'll assume it's admin-only as it's in the admin route file.
router.get("/user", isAuth, isAdmin, blogController.getBlogsByUser);

router.get("/:blogId", isAuth, isAdmin, blogController.getBlogById);

//Create blog
router.post(
  "/",
  [
    body("name", "Name should be alphabet").trim().isString(),
    body("summary", "Summary should be in alphabet").trim().isString(),
    body("content", "Content should be string").trim().isString(),
  ],
  isAuth,
  isAdmin, // Add isAdmin middleware
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
  isAdmin, // Add isAdmin middleware
  blogController.updateBlog
);

//Delete a blog
router.delete("/:blogId", isAuth, isAdmin, blogController.deleteBlog);

module.exports = router;
