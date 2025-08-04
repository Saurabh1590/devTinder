require('dotenv').config();

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinder:8CwgLg0aLYYeCw4r@devtinder.glagl.mongodb.net/devTinder"
)};

module.exports = connectDB;