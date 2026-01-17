import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies
} from "../controllers/movies.controller.js";

import { isAuthenticated, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Public / utilisateur connecté
router.get("/search", searchMovies);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);

// Admin uniquement
router.post("/", isAuthenticated, isAdmin, createMovie);
router.put("/:id", isAuthenticated, isAdmin, updateMovie);
router.delete("/:id", isAuthenticated, isAdmin, deleteMovie);

export default router;
