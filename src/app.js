const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("data is successfully saved in databse");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// get user using emailId
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (!users) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// Feed API
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// get user using Id
app.get("/user", async (req, res) => {
  try {
    const userId = req.body.id;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// delete the user using userId
app.delete("/user", async (req, res) => {
  const userId = req.body.Id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//find by Id and Update
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "firstName",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    console.log("Keys in Request Body:", Object.keys(data));
    console.log("Allowed Updates:", ALLOWED_UPDATES);

    if (!isUpdateAllowed) {
      throw new Error("Update is not allowed");
    }
    if (data?.skills && data.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is listining at port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
