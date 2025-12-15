export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next();
    }
    return res.status(401).json({ error: "Utilisateur non connecté" });
  };
  
  export const isAdmin = (req, res, next) => {
    if (req.session.userId && req.session.userRole === "admin") {
      return next();
    }
    return res.status(403).json({ error: "Accès refusé" });
  };
  