const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () =>
{
  mongoose.set("strictQuery", false);
  
  // Extract the base URL and add the database name properly
  let dbUrl = process.env.DB_URL;
  if (dbUrl) {
    // Check if the URL already has a database name
    const urlParts = dbUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    
    // If the last part doesn't look like a database name (contains special chars or is empty)
    if (!lastPart || lastPart.includes('?') || lastPart.includes('&')) {
      // Remove any trailing slash and add the database name
      dbUrl = dbUrl.replace(/\/$/, '') + '/elearnnn';
    } else if (lastPart !== 'elearnnn') {
      // Replace the existing database name
      urlParts[urlParts.length - 1] = 'elearnnn';
      dbUrl = urlParts.join('/');
    }
  }
  
  mongoose
    .connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() =>
    {
      console.log("Database connected💻 - Database: elearnnn");
    })
    .catch((err) => console.log(err));
};

module.exports = dbConnect;
