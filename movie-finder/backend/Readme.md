Ce qui a été fait :
Création d’un backend Node.js / Express fonctionnel
Connexion à MongoDB pour stocker les utilisateurs et futures données films/séries
Gestion des sessions persistantes avec Redis
Mise en place de l’authentification :
Login classique avec email/mot de passe (hashé avec bcrypt)
Login via Google OAuth 2.0 avec Passport.js
Gestion sécurisée des hooks Mongoose pour éviter les erreurs avec les utilisateurs OAuth
Test complet du backend : routes d’authentification, sessions et connexion MongoDB fonctionnelles
Ce qu’il reste à faire :
Créer la collection Movies dans MongoDB avec toutes les informations nécessaires (titre, description, image, note, date…)
Développer les routes CRUD pour les films/séries, avec protection pour les admins
Ajouter les routes pour gérer les favoris des utilisateurs (ajout, suppression, consultation)
Connecter le frontend React au backend, pour remplacer l’API TMDB et gérer les films/favoris
Ajouter des fonctionnalités bonus : pagination, filtres, dashboard admin, et sécurisation des routes



Pour lancer mon backend :
npx nodemon src/server.js
