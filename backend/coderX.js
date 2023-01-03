const express = require('express');
const app = express();
const cors = require("cors");
const port = 8000;

app.use(cors());
app.use(express.json());


app.post("/submit", (req, res) =>
{
    console.log("req.body");
    res.status(200).send(req.body);
})

app.get("/editor", (req, res) =>
{
    console.log("editor...");
    
})

app.listen(port, () =>
{
    console.log("express running...");
})
