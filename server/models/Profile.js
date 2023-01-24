const mongoose = require("mongoose");
const { Schema } = mongoose;

const profileSchema = new Schema({
  imageUrl: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Profile", profileSchema);
