const { default: mongoose } = require("mongoose");

const mongooes = required("mongoose");
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
  },
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: "Modules",
      required: true,
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
