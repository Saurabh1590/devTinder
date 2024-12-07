const express = require("express");
const app = express();

app.use("/jisoo", (req, res) => {
  res.send("Hello Jisoo!");
});

app.use("/lisa", (req, res) => {
  res.send("Hello lisa!");
});

app.use("/jennie", (req, res) => {
    res.send("Hello Jennie!");
  });

  app.use((req, res) => {
    res.send("Hello Saurabh!");
  });
  
  

app.listen(7777, () => {
  console.log("Server is listining at port 7777");
});
