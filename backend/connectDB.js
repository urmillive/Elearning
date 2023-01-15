const mongoose = require("mongoose");
require('dotenv').config();
const dbConnect = () =>
{
	mongoose.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 10000
	})
		.then((db) => console.log("Database connected"))
		.catch((err) => console.log("======>", err));
};

module.exports = dbConnect;
