import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import dotenv from "dotenv";
import passport from "passport";
import "./config/passport.js";

import userRoutes from "./routes/users.js";
import movieRoutes from "./routes/movies.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Redis client
const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis error:", err));
await redisClient.connect();
console.log("Redis connecté");

// Session avec Redis
app.use(
  session({
    store: new RedisStore({
      client: redisClient,
      prefix: "moviefinder:",
    }),
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 jour
    },
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.error("MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend Movie Finder OK");
});

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
