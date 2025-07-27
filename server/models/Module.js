const mongoose = require("mongoose");
const { Schema } = mongoose;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  contentType: {
    type: String,
    enum: ['video', 'text', 'quiz', 'file', 'external_link', 'uploaded_video'], // Added 'uploaded_video'
    default: 'text',
  },
  content: { // For text content, URL for video/file/external_link, or server path for uploaded_video
    type: String,
    trim: true,
  },
  durationMinutes: { // Optional duration in minutes
    type: Number,
    min: 0,
  },
  isFreePreview: { // Can this lesson be previewed for free?
    type: Boolean,
    default: false,
  }
}, { timestamps: true }); // Added timestamps to lessons if needed

const moduleSchema = new Schema({
  name: {
    type: String,
    required: [true, "Module name is required."],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  lessons: [lessonSchema], // Array of lesson sub-documents
  course: { // Reference to the parent course
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true, // A module should belong to a course
  },
  order: { // To maintain the order of modules within a course
    type: Number,
    default: 0,
  }
}, { timestamps: true }); // Added timestamps to modules

module.exports = mongoose.model("Module", moduleSchema);
