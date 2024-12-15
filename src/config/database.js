const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://devTinder:IuafUHVkJmesTccL@devtinder.glagl.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
