const mongoose = require("mongoose");
const { Schema } = mongoose;

const certificateSchema = new Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
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
  enrollment: {
    type: Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    required: true
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
    default: 'A'
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  totalLessons: {
    type: Number,
    required: true
  },
  completedLessons: {
    type: Number,
    required: true
  },
  totalTimeSpent: {
    type: Number, // in minutes
    required: true
  },
  certificateUrl: {
    type: String,
    trim: true
  },
  verified: {
    type: Boolean,
    default: true
  },
  verificationCode: {
    type: String,
    unique: true,
    sparse: true
  },
  expiresAt: {
    type: Date
  },
  metadata: {
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    courseCategory: String,
    skillLevel: String,
    language: String
  }
}, { timestamps: true });

// Generate verification code
certificateSchema.methods.generateVerificationCode = function() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 8);
  return `VERIFY-${this.certificateId.substr(-8)}-${timestamp}-${random}`.toUpperCase();
};

// Calculate grade based on score
certificateSchema.methods.calculateGrade = function() {
  const score = this.score;
  if (score >= 97) return 'A+';
  if (score >= 93) return 'A';
  if (score >= 90) return 'A-';
  if (score >= 87) return 'B+';
  if (score >= 83) return 'B';
  if (score >= 80) return 'B-';
  if (score >= 77) return 'C+';
  if (score >= 73) return 'C';
  if (score >= 70) return 'C-';
  if (score >= 60) return 'D';
  return 'F';
};

// Set expiration date (5 years from issue)
certificateSchema.methods.setExpiration = function() {
  const expirationDate = new Date(this.issuedAt);
  expirationDate.setFullYear(expirationDate.getFullYear() + 5);
  this.expiresAt = expirationDate;
};

module.exports = mongoose.model("Certificate", certificateSchema); 