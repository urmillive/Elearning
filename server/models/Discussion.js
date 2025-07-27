const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  isInstructorReply: {
    type: Boolean,
    default: false
  },
  isAcceptedAnswer: {
    type: Boolean,
    default: false
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
}, { timestamps: true });

const discussionSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: "Module"
  },
  lesson: {
    type: Schema.Types.ObjectId
  },
  type: {
    type: String,
    enum: ['question', 'discussion', 'announcement', 'general'],
    default: 'discussion'
  },
  status: {
    type: String,
    enum: ['open', 'closed', 'resolved', 'archived'],
    default: 'open'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  tags: [String],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  views: {
    type: Number,
    default: 0
  },
  comments: [commentSchema],
  isPinned: {
    type: Boolean,
    default: false
  },
  isLocked: {
    type: Boolean,
    default: false
  },
  lastActivity: {
    type: Date,
    default: Date.now
  },
  metadata: {
    category: String,
    difficulty: String,
    relatedTopics: [String]
  }
}, { timestamps: true });

// Update last activity when comment is added
discussionSchema.methods.updateLastActivity = function() {
  this.lastActivity = new Date();
  return this.save();
};

// Get comment count
discussionSchema.methods.getCommentCount = function() {
  return this.comments.length;
};

// Get like count
discussionSchema.methods.getLikeCount = function() {
  return this.likes.length;
};

// Check if user has liked
discussionSchema.methods.hasUserLiked = function(userId) {
  return this.likes.includes(userId);
};

// Add view
discussionSchema.methods.addView = function() {
  this.views += 1;
  return this.save();
};

module.exports = mongoose.model("Discussion", discussionSchema); 