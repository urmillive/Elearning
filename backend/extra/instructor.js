const mongoose = require("mongoose");
const instructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        required: true,
        maxlength: 2000
    },
    photo: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("Instructor", instructorSchema);
