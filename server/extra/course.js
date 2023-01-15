const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        required: true
    },
    instructor: {
        type: ObjectId,
        ref: "Instructor",
        required: true
    },
    enrolled: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        enum: [ "beginner", "intermediate", "advanced" ],
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("Course", courseSchema);
