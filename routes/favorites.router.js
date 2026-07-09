import { Router } from "express";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favorite.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const favoriteRouter = Router();

favoriteRouter.post('/:id/favorite', addFavorite);
favoriteRouter.get('/:id/favorite', getFavorites);
favoriteRouter.delete('/:id/favorite/:bookId', deleteFavorite);

export default favoriteRouter;