import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

// Lire tous les films
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// Ajouter un film
router.post("/", async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
