import User from "../models/User.js";

/**
 * GET /users (admin)
 */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * GET /users/:id (admin)
 */
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "ID invalide" });
  }
};

/**
 * POST /users/register
 */
export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await User.create({
      email,
      password,
      role: role || "user",
    });

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(400).json({ message: "Données invalides" });
  }
};

/**
 * POST /users/login
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    req.session.userId = user._id;
    req.session.userRole = user.role;

    res.status(200).json({ message: "Connecté", user });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

/**
 * PUT /users/:id (admin)
 */
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: "Erreur mise à jour" });
  }
};

/**
 * DELETE /users/:id (admin)
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(400).json({ message: "Erreur suppression" });
  }
};

/**
 * FAVORITES
 */
export const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const { movieId } = req.params;

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const { movieId } = req.params;

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== movieId
    );

    await user.save();
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).populate("favorites");
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
