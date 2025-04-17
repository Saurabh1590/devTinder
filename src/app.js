const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Luffy",
    lastName: "Sahani",
    emailId: "luffy@1234.com",
    password: "25r2wftsd",
    age: 23,
  });

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected");
  });
