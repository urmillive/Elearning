const express = require("express");
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());


const dbConnect = require('./connectDB');
dbConnect();

const authRouter = require("./routes/authRoute");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(authRouter);

app.listen(process.env.PORT, () =>
{
    console.log(`listening on port ${ process.env.PORT }`);
});
