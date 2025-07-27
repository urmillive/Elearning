module.exports = (req, res, next) => {
  if (!req.isAdmin) {
    const error = new Error("Forbidden: Admin access required.");
    error.statusCode = 403;
    return next(error); // Pass the error to the error-handling middleware
  }
  next(); // User is admin, proceed to the next middleware/handler
};