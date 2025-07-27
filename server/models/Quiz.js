const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['multiple_choice', 'single_choice', 'true_false', 'fill_blank', 'essay'],
    default: 'multiple_choice'
  },
  options: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      default: false
    }
  }],
  correctAnswer: {
    type: String,
    trim: true
  },
  explanation: {
    type: String,
    trim: true
  },
  points: {
    type: Number,
    default: 1,
    min: 1
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  tags: [String],
  timeLimit: {
    type: Number, // in seconds
    default: 60
  }
}, { timestamps: true });

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "Module",
    required: true
  },
  lesson: {
    type: Schema.Types.ObjectId,
    required: true
  },
  questions: [questionSchema],
  totalPoints: {
    type: Number,
    default: 0
  },
  passingScore: {
    type: Number,
    default: 70, // percentage
    min: 0,
    max: 100
  },
  timeLimit: {
    type: Number, // in minutes
    default: 30
  },
  attempts: {
    type: Number,
    default: 3,
    min: 1
  },
  shuffleQuestions: {
    type: Boolean,
    default: true
  },
  showResults: {
    type: Boolean,
    default: true
  },
  showCorrectAnswers: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  metadata: {
    category: String,
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate'
    },
    estimatedTime: Number, // in minutes
    tags: [String]
  }
}, { timestamps: true });

// Calculate total points
quizSchema.methods.calculateTotalPoints = function() {
  this.totalPoints = this.questions.reduce((total, question) => total + question.points, 0);
  return this.totalPoints;
};

// Get passing score in points
quizSchema.methods.getPassingScorePoints = function() {
  return Math.ceil((this.passingScore / 100) * this.totalPoints);
};

// Check if quiz is valid
quizSchema.methods.isValid = function() {
  return this.questions.length > 0 && this.isActive;
};

module.exports = mongoose.model("Quiz", quizSchema); 