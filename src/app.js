const express = require("express");
const app = express();

app.get("/us|e|r", (req, res) => {
  res.send({firstname: "Saurabh", lastname: "Sahani"})
});

app.post("/us*er", (req, res) => {
  res.send("data saved to database sucessfully!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted the data sucessfully!");
});

app.patch("/user", (req, res) => {
  res.send("Patched the data sucessfully!");
});


app.use("/hello", (req, res) => {
  res.send("Hello Saurabh 2");
});

app.use("/", (req, res) => {
  res.send("Hello Saurabh");
});

app.listen(7777, () => {
  console.log("Server is listining at port 7777");
});
