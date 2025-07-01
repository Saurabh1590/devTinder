const express = require("express");
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
const {
  validateProfileFields,
  validateExistingPassword,
} = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    validateProfileFields(req);

    const loggedUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));

    await loggedUser.save();
    res.json({
      message: `${loggedUser.firstName}'s profile is updated successfully`,
      data: loggedUser, // or just relevant fields
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const passwordHash = user.password;
    console.log(passwordHash);
    const { existingPassword, newPassword } = req.body;
    const isMatch = await bcrypt.compare(existingPassword, passwordHash);

    if (!isMatch) {
      throw new Error("provided existing password not matched");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    console.log(user.password);
    await user.save();

    res.send("Password updated successfully!");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = profileRouter;
