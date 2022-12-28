const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
