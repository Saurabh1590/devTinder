const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const cors = require("cors");
const paymentRouter = require("./routes/payment");
const http = require("http");
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

require("dotenv").config();

require("./utils/cronJob");

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://dev-tinder-web-phi.vercel.app", // YOUR VERCEL FRONTEND
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true); // allow non-browser tools like Postman
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 7777;

connectDB()
  .then(() => {
    console.log("database connection established");
    server.listen(PORT, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("database cannot be connected :" + err);
  });
