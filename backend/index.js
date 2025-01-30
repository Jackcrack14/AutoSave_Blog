const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/api");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_URI);
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",

    // Add ALL possible origins
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
// Server-side (Express)

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

app.listen(5000, () => {
  console.log("server running sucessfull!!");
});
