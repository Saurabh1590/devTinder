const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 50,
  },
  emailId: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 20,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  photoURL: {
    type: String,
  },
  about: {
    type: String,
    default: "This is default data about the user",
  },
  skills: {
    type: [String],
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
