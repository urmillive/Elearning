const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

// Database
const connectDB = require("./util/connectDB");

//Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
// Public blog routes
const publicBlogRoutes = require("./routes/blog");
// Public course routes
const publicCourseRoutes = require("./routes/course");
// Enrollment routes
const enrollmentRoutes = require("./routes/enrollment");
// Admin blog Route
const adminBlogRoutes = require("./routes/admin/blog");
//user handler route
const userHandlerRoutes = require("./routes/admin/userRoute");
//editor handler route
const editorRoutes = require("./routes/editor");
// Admin course routes
const adminCourseRoutes = require("./routes/admin/course");
// Admin upload routes
const adminUploadRoutes = require("./routes/admin/upload");
// Contact form route
const contactRoutes = require("./routes/contact");

// Passport config (ensure this is required to execute passport.use())
require('./config/passport-setup');
const passport = require('passport'); // require passport itself

const app = express();

// Initialize Passport (before routes that use it)
app.use(passport.initialize());
// If using sessions (even if minimally for some OAuth flows, though we aim for JWT):
// const session = require('express-session');
// app.use(session({ secret: process.env.SESSION_SECRET || 'your session secret', resave: false, saveUninitialized: false }));
// app.use(passport.session());


// Simple request logging middleware
app.use((req, res, next) => {
  console.log(`Incoming Request: Method=${req.method}, URL=${req.originalUrl}, Path=${req.path}, Origin=${req.headers.origin || 'No Origin'}`);
  // Optionally, log headers if needed for deep debugging:
  // console.log('Request Headers:', JSON.stringify(req.headers, null, 2));
  next();
});

// Add headers middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

connectDB();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const mimeType = file.mimetype;
    if (mimeType.startsWith("video/")) {
      cb(null, "public/videos");
    } else if (mimeType === "application/json") {
      cb(null, "public/modules");
    } else if (mimeType.startsWith("image/")) {
      cb(null, "public/images");
    } else {
      cb(new Error("Invalid file type for destination mapping."), false);
    }
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, uuidv4() + extension);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "application/json" || // More specific check for JSON
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "video/ogg"
    // Add other video types as needed
  ) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported. Please upload a valid image, JSON, or video file."), false);
  }
};


app.use(bodyParser.json()); // Moved bodyParser before CORS as a general good practice, though unlikely to be the cause here.

const allowedOrigins = [
  'https://elearning-steel-three.vercel.app',
  'https://elearning-c9yc.onrender.com', // Add the render.com domain
  'http://localhost:3000', // Assuming client runs on port 3000 locally
  'http://localhost:3001', // Another common local port
  'http://localhost:4200', // Added for typical client dev server port
  'http://localhost:4201', // Additional local port
  'http://localhost:5000', // Server port
  // Add any other client origins if necessary
];

// Handle preflight requests
app.options('*', cors());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // For development, allow all localhost origins
    if (origin && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Explicitly include OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'], // Add common headers
  credentials: true, // If you need to handle cookies or authorization headers
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")
);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(authRoutes);
app.use("/profile", profileRoutes);

// Public blog routes
app.use("/blogs", publicBlogRoutes); // New public blog routes
// Public course routes
app.use("/courses", publicCourseRoutes); // New public course routes
// Enrollment routes
app.use("/enrollment", enrollmentRoutes);
// Contact form route
app.use("/api/contact", contactRoutes);


//userHandler router for Admin
app.use("/user", userHandlerRoutes);

//blog route (admin)
app.use("/admin/blogs", adminBlogRoutes); // Changed from /blog to /admin/blogs

//editor router
app.use("/editor", editorRoutes);

// Admin course router
app.use("/admin/courses", adminCourseRoutes);
// Admin upload router
app.use("/admin/uploads", adminUploadRoutes);

app.use("/", (req, res, next) => {
  res.send("Hello World");
}); 

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
