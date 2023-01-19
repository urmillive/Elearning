const express = require("express");
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(cors());


const dbConnect = require('./connectDB');
dbConnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const authRouter = require("./routes/authRoute");
const editorRouter = require("./routes/editorRoute");

app.use(authRouter);
app.use(editorRouter);

app.listen(process.env.PORT, () =>
{
    console.log(`listening on port ${ process.env.PORT }`);
});
