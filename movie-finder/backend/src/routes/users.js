import express from "express";
import User from "../models/User.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Utilisateur non trouvé" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Mot de passe incorrect" });

    req.session.userId = user._id; // session
    res.json({ message: "Connecté", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ajouter un film aux favoris
router.post("/favorites/:movieId", isAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      const movieId = req.params.movieId;
  
      if (!user.favorites.includes(movieId)) {
        user.favorites.push(movieId);
        await user.save();
      }
  
      res.json({ message: "Film ajouté aux favoris", favorites: user.favorites });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Retirer un film des favoris
  router.delete("/favorites/:movieId", isAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId);
      const movieId = req.params.movieId;
  
      user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
      await user.save();
  
      res.json({ message: "Film retiré des favoris", favorites: user.favorites });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Récupérer les favoris de l'utilisateur
  router.get("/favorites", isAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.session.userId).populate("favorites");
      res.json(user.favorites);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

export default router;
