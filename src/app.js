const express = require("express");
const app = express();

app.use("/hello", [(req, res, next) => {
  console.log("1st handler is listened");
  // res.send("1st handler");
  next()
},(req, res, next) => {
  console.log("2nd Handler is listened");
  next();
  // res.send("2nd handler");
},(req, res, next) => {
  console.log("3rd Handler is listened");
  next();
  // res.send("2nd handler");
},(req, res, next) => {
  console.log("4th Handler is listened");
  next();
  res.send("4th handler");
}])

app.listen(7777, () => {
  console.log("Server is listining at port 7777");
});
