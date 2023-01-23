const mongoose = required("mongoose");
const { Schema } = mongoose;

const moduleSchema = new Schema({
  files: {
    items: [
      {
        courseFile: {
          type: String,
        },
      },
    ],
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("Module", moduleSchema);
