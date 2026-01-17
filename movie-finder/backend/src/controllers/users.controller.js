import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    const user = new User({ email, password, role: "user" });
    await user.save();

    res.status(201).json({ 
      message: "Utilisateur créé avec succès",
      userId: user._id 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Tentative de connexion:', email);

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      console.log('Mot de passe incorrect');
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Sauvegarder dans la session
    req.session.userId = user._id;
    req.session.userRole = user.role;

    console.log('Connexion réussie:', {
      userId: user._id,
      email: user.email,
      role: user.role
    });

    res.json({
      message: "Connexion réussie",
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, role },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { movieId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.json({ message: "Film ajouté aux favoris" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { movieId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== movieId
    );
    await user.save();

    res.json({ message: "Film retiré des favoris" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.session.userId;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};