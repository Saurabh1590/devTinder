const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// get user by id
app.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) {
      res.send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    throw res.status(400).send("Something went wrong");
  }
});

// find by email
app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    throw res.status(400).send("Something went wrong");
  }
});

app.post("/signup", async (req, res) => {
  const user = await new User(req.body);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error Saving the user:" + err.message);
  }
});

// delete a user from the database
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//find by id and update
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, data, {
      runValidators: true,
    });
    console.log(user);
    res.send("User updated succesfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:"+ err.message);
  }
});

//find by emaiid and update
app.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body;
  try {
    await User.findOneAndUpdate({ emailId }, data, { runValidators: true });
    res.send("User updated succesfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
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
