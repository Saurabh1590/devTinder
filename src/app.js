const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Saurabh",
    lastName: "Sahani",
    emailId: "saurabh@12.com",
    password: "saurabh@123",
    gender: "male",
    age: "21",
  });

  try {
    await user.save();
    res.send("data is successfully saved in databse");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(7777, () => {
      console.log("Server is listining at port 7777");
    });
  })
  .catch((err) => {
    send.err("There was something wrong");
  });
