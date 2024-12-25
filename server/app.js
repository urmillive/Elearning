const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const User = require("./models/User");

// Database
const connectDB = require("./util/connectDB");

//Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
//blog Route
const blogRoutes = require("./routes/admin/blog");
//user handler route
const userHandlerRoutes = require("./routes/admin/userRoute");
//editor handler route
const editorRoutes = require("./routes/editor");

const app = express();
connectDB();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) =>
  {
    const extension = file.mimetype.split("/")[ 1 ];
    if (extension === "json")
    {
      cb(null, "public/modules");
    } else
    {
      cb(null, "public/images");
    }
  },
  filename: (req, file, cb) =>
  {
    const extension = file.originalname.split(".")[ 1 ];
    cb(null, uuidv4() + "." + extension);
  },
});

const fileFilter = (req, file, cb) =>
{
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  )
  {
    cb(null, true);
  } else if (file.mimetype.split("/")[ 1 ] === "json")
  {
    cb(null, true);
  } else
  {
    cb(new Error("Image uploaded is not of Valid types"), false);
  }
};


app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  methods: [ 'GET', 'POST', 'PUT' ]
}));

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")
);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(authRoutes);
app.use("/profile", profileRoutes);

//userHandler router for Admin
app.use("/user", userHandlerRoutes);

//blog route
app.use("/blog", blogRoutes);

//editor router
app.use("/editor", editorRoutes)

app.use("/", (req, res, next) => {
  res.send("Hello World");
});

app.use((error, req, res, next) =>
{
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.listen(process.env.PORT, () =>
{
  console.log(`Server is running at port ${ process.env.PORT }`);
});
