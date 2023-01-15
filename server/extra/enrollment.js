const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const enrollmentSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    course: {
        type: ObjectId,
        ref: "Course",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
