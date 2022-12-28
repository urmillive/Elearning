const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please Provide First Name"],
    unique: false,
  },
  lastName: {
    type: String,
    required: [true, "Please Provide Last Name"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email"],
    unique: [true, "Email Exist"],
  },
  contactNumber: {
    type: Number,
    required: [true, "Please Provide a number"],
    unique: [true, "Number Exist"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a Password"],
    unique: false,
  },
});

module.exports =
  mongoose.model.UserSchema || mongoose.model("User", UserSchema);
