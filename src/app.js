const express = require('express');

const app = express();

app.get("/user",(req, res) => {
    res.send({firstName: "Saurabh", lastName: "Sahani"})
})

app.post("/user",(req, res) => {
    res.send("Data succesfully saved to database!");
})

app.patch("/user",(req, res) => {
    res.send("patched succesfully!");
})

app.delete("/user",(req, res) => {
    res.send("deleted succesfully!");
})

app.use("/test",(req,res) => {
    res.send("hello from the server!");
})


app.listen((7777), () => {
    console.log("Server is successfully listening on port 7000...")
});