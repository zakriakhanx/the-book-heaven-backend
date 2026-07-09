import { Router } from "express";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favorite.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const favoriteRouter = Router();

favoriteRouter.post('/favorite', addFavorite);
favoriteRouter.get('/favorite', getFavorites);
favoriteRouter.delete('favorite/:bookId', deleteFavorite);

export default favoriteRouter;