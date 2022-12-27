const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const app = express();

mongoose.connect(
    "mongodb://localhost:27017/e-learning",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    () =>
    {
        console.log("Connected");
    }
).catch(
    (err) =>
    {
        console.log(err);
    }
)

// user Schema

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}
);

// Model

const USer = new mongoose.model("User", userSchema);


// Routes

app.post("/register", (req, res) =>
{
    const { fname, lname, mobile, email, password } = req.body
    User.findOne({
        email: email
    }, (err, user) =>       
    {
        if (user)
        {
            res.send({message:"User Already Exist"})
        }
    })

    const user = new User({
        fname,
        lname,
        mobile,
        password
    })
    user.save((err) =>
    {
        if (err)
        {
            res.send(err);
        } else
        {
            res.send({ message: "Successfully Registered" });
        }
    })
})

app.post("/login", (req, res) =>
{
    res.send("hello coder");
})

app.listen(8000, () =>
{
    console.log("running express")
})
