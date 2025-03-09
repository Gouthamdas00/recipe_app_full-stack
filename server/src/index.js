import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan"; // Logging middleware

dotenv.config();

// Validate .env variables
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env file.");
  process.exit(1); // Stop execution if MONGODB_URI is not defined
}

import { usersRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev")); // Logs HTTP requests

// Routes
app.use("/auth", usersRouter);
app.use("/recipes", recipesRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop the server if DB connection fails
  });

app.get("/", (req, res) => {
  res.send("Hello, World! 🌍");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
