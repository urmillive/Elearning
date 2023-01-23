const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () =>
{
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() =>
    {
      console.log("Database connected💻");
    })
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
