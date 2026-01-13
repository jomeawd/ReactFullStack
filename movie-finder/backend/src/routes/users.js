import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/auth.js";
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", isAdmin, getAllUsers);
router.get("/:id", isAdmin, getUserById);
router.put("/:id", isAdmin, updateUser);
router.delete("/:id", isAdmin, deleteUser);

router.post("/favorites/:movieId", isAuthenticated, addFavorite);
router.delete("/favorites/:movieId", isAuthenticated, removeFavorite);
router.get("/favorites", isAuthenticated, getFavorites);

export default router;
