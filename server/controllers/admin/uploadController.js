exports.handleVideoUpload = (req, res, next) => {
  if (!req.file) {
    const error = new Error("No video file uploaded.");
    error.statusCode = 422; // Unprocessable Entity
    return next(error);
  }

  // req.file contains information about the uploaded file
  // The file is already saved by Multer to the destination (e.g., public/videos)
  // We need to return the path that the client can use to access it.
  // Multer's destination was 'public/videos', and 'public' is served at '/public'
  const filePath = `/public/videos/${req.file.filename}`;

  res.status(201).json({
    message: "Video uploaded successfully!",
    filePath: filePath, // e.g., /public/videos/generated-filename.mp4
  });
};