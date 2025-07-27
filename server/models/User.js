const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: { // For storing Google User ID
    type: String,
    unique: true,
    sparse: true, // Allows multiple nulls if not all users have googleId
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    required: [ true, "Please Provide First Name" ],
  },
  lastName: {
    type: String,
    required: [ true, "Please Provide Last Name" ],
  },
  email: {
    type: String,
    required: [ true, "Please Provide an Email" ],
    unique: true, // Email should be unique
  },
  contactNumber: {
    type: String, // Changed to String to allow for formatting, country codes, etc.
    required: false, // Made optional for Google Sign-up
    // unique: [ true, "Number Exist" ], // Consider if contactNumber still needs to be unique if optional
  },
  password: {
    type: String,
    required: [ true, "Please Provide a Password" ],
    unique: false,
  },
  profile: {
    type: String, // URL to profile picture
    required: false,
  },
  // 'profile' field seems to be for a custom profile string, maybe keep or rename if it conflicts with profilePicUrl
  // For clarity, let's assume 'profile' is distinct from Google's profile picture.
  // If 'profile' was meant for profile picture URL, then 'profilePicUrl' replaces it.
  // Let's keep 'profile' as is for now, assuming it's different.
  profile: {
    type: String,
    required: false,
    default: ""
  },
  authProvider: { // To track how the user signed up
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }
  ],
});

module.exports = mongoose.model("User", UserSchema);
