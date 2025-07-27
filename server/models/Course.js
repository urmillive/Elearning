const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0, // Duration should not be negative
  },
  price: {
    type: Number,
    required: [true, "Course price is required."],
    min: 0,
    default: 0,
  },
  category: {
    type: String,
    trim: true,
    // Consider making this an enum if you have predefined categories
    // enum: ['Programming', 'Design', 'Business', 'Marketing', 'Lifestyle'],
  },
  imageUrl: {
    type: String,
    trim: true,
    // Consider adding a default image URL
  },
  instructor: { // Optional: if you have instructors
    type: Schema.Types.ObjectId,
    ref: 'User', // Or 'Profile' if instructors have separate profiles
  },
  tags: [String], // For keywords/tags
  skillLevel: { // e.g., Beginner, Intermediate, Advanced
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
    default: 'All Levels',
  },
  language: {
    type: String,
    default: 'English',
  },
  modules: [ // Modules associated with this course
    {
      type: Schema.Types.ObjectId,
      ref: "Module", // Corrected from "Modules" to "Module"
      // 'required: true' might be too strict if a course can be created before modules
    },
  ],
  enrolledUsers: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
