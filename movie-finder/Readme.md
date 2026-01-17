# Movie Finder

Application full-stack de gestion de films avec système d'authentification et favoris.

## Fonctionnalités

- Authentification utilisateur (email/password + Google OAuth)
- CRUD complet sur les films (admin uniquement)
- Système de favoris (utilisateurs connectés)
- Recherche de films
- Gestion des utilisateurs (admin)
- Thème clair/sombre
- Sessions sécurisées avec Redis

## Technologies

### Backend
- **Node.js** + **Express**
- **MongoDB** (Mongoose)
- **Redis** (sessions)
- **Passport.js** (Google OAuth)
- **bcrypt** (hachage des mots de passe)

### Frontend
- **React** (Vite)
- **React Router**
- **Context API** (state management)

## 📁 Structure du projet
```
movie-finder/
├── backend/
│   └── src/
│       ├── config/          # Configuration Passport
│       ├── controllers/     # Logique métier
│       ├── middlewares/     # Auth middlewares
│       ├── models/          # Modèles MongoDB
│       ├── routes/          # Routes API
│       └── server.js        # Point d'entrée
└── frontend/
    └── src/
        ├── components/      # Composants React
        ├── context/         # Contexts (Auth, Favorites, Theme)
        ├── pages/           # Pages de l'app
        ├── services/        # API calls
        └── App.jsx          # Composant principal
```

## Installation

### Prérequis

- Node.js (v16+)
- MongoDB
- Redis

### 1. Cloner le projet
```bash
git clone https://github.com/jomeawd/ReactFullStack.git
cd movie-finder
```

### 2. Backend
```bash
cd backend
npm install
```

Créer un fichier `.env` :
```env
MONGO_URI=mongodb://localhost:27017/moviefinder
SESSION_SECRET=votre_secret_session
PORT=5005

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_CLIENT_SECRET=votre_client_secret
```

Démarrer MongoDB et Redis :
```bash
# MongoDB
mongod

# Redis
redis-server
```

Lancer le backend :
```bash
npm start
```

Le backend tourne sur `http://localhost:5005`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

Le frontend tourne sur `http://localhost:5173`

```

## API Endpoints

### Authentification
- `POST /api/users/register` - Inscription
- `POST /api/users/login` - Connexion
- `GET /auth/google` - Connexion Google
- `GET /auth/google/callback` - Callback Google

### Films (routes publiques)
- `GET /api/movies` - Liste des films
- `GET /api/movies/:id` - Détails d'un film
- `GET /api/movies/search?query=...` - Recherche

### Films (admin uniquement)
- `POST /api/movies` - Créer un film
- `PUT /api/movies/:id` - Modifier un film
- `DELETE /api/movies/:id` - Supprimer un film

### Favoris (authentifié)
- `GET /api/users/favorites` - Mes favoris
- `POST /api/users/favorites/:movieId` - Ajouter favori
- `DELETE /api/users/favorites/:movieId` - Retirer favori

### Utilisateurs (admin uniquement)
- `GET /api/users` - Liste utilisateurs
- `GET /api/users/:id` - Détails utilisateur
- `PUT /api/users/:id` - Modifier utilisateur
- `DELETE /api/users/:id` - Supprimer utilisateur

## Pages Frontend

- `/` - Accueil (liste des films)
- `/search` - Recherche de films
- `/favorites` - Mes favoris
- `/movie/:id` - Détails d'un film
- `/login` - Connexion/Inscription
- `/admin` - Panel admin (films + utilisateurs)
- `/settings` - Paramètres (thème + infos compte)

## Rôles et permissions

### Utilisateur standard
- Voir les films
- Ajouter/retirer des favoris
- Rechercher des films

### Administrateur
- Toutes les permissions utilisateur
- Créer/modifier/supprimer des films
- Gérer les utilisateurs (rôles, suppression)

## Modèles de données

### Movie
```javascript
{
  title: String,
  description: String,
  releaseDate: Date,
  rating: Number,
  genre: [String]
}
```

### User
```javascript
{
  email: String,
  password: String,
  role: String (enum: ['user', 'admin']),
  favorites: [ObjectId]
}
```

## Auteur

John Botros