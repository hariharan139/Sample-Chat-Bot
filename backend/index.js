import express from "express";
import dotenv from "dotenv";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import botgptRoute from "./routes/botgpt.route.js";
dotenv.config();
const app = express();
const port = process.env.port || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//DB connection
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

// defining routes
app.use("/bot/v1/", botgptRoute);

// server listening
app.listen(port, () => {
  console.log("Server running on port " + port);
});
