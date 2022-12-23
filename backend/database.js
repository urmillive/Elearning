const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb://localhost:27017"
).then(
    () =>
    {
        console.log("Connected");
    }
).catch(
    () =>
    {
        console.log("Failed");
    }
)
