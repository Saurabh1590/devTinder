const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);

app.use("/user/login", (req, res) => {
  res.send("User Logined");
});

app.use("/user/getData", userAuth, (req, res) => {
  res.send("User fetched the data successfully");
});

app.use("/admin/getAllData", (req, res) => {
  res.send("Admin successfully fetched the data");
});

app.use("/admin/removeData", (req, res) => {
  res.send("Admin successfully remove the data");
});

app.listen(7777, () => {
  console.log("Server is listining at port 7777");
});
