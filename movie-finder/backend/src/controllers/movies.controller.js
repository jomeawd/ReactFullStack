import Movie from "../models/Movie.js";

// GET /movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /movies/:id
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Film non trouvé" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ message: "ID invalide" });
  }
};

// POST /movies (admin)
export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Données invalides" });
  }
};

// PUT /movies/:id (admin)
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!movie) {
      return res.status(404).json({ message: "Film non trouvé" });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Erreur mise à jour" });
  }
};

// DELETE /movies/:id (admin)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Film non trouvé" });
    }
    res.status(200).json({ message: "Film supprimé" });
  } catch (err) {
    res.status(400).json({ message: "Erreur suppression" });
  }
};
