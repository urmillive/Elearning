const mongoose = require("mongoose");
const { Schema } = mongoose;

const lessonProgressSchema = new Schema({
  lesson: {
    type: Schema.Types.ObjectId,
    ref: "Module.lessons", // Reference to lesson within module
    required: true
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  quizScore: {
    type: Number, // for quiz lessons
    min: 0,
    max: 100
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const enrollmentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active'
  },
  progress: {
    type: Number, // percentage (0-100)
    default: 0,
    min: 0,
    max: 100
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateIssuedAt: {
    type: Date
  },
  certificateId: {
    type: String,
    unique: true,
    sparse: true
  },
  lessonProgress: [lessonProgressSchema],
  totalTimeSpent: {
    type: Number, // in minutes
    default: 0
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    trim: true
  },
  reviewDate: {
    type: Date
  }
}, { timestamps: true });

// Compound index to ensure unique user-course combinations
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

// Generate certificate ID
enrollmentSchema.methods.generateCertificateId = function() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `CERT-${this.course.toString().substr(-6)}-${this.user.toString().substr(-6)}-${timestamp}-${random}`.toUpperCase();
};

// Calculate progress percentage
enrollmentSchema.methods.calculateProgress = function() {
  if (!this.lessonProgress || this.lessonProgress.length === 0) {
    return 0;
  }
  
  const completedLessons = this.lessonProgress.filter(lp => lp.completed).length;
  const totalLessons = this.lessonProgress.length;
  
  return Math.round((completedLessons / totalLessons) * 100);
};

module.exports = mongoose.model("Enrollment", enrollmentSchema); 