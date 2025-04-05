import { Router } from "express";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/favorite.controller.js";
import { authorize, authorizeRole } from '../middleware/auth.middleware.js';

const favoriteRouter = Router();

favoriteRouter.post('/:id/favorite', authorize, addFavorite);
favoriteRouter.get('/:id/favorite', authorize, getFavorites);
favoriteRouter.delete('/:id/favorite/:bookId', authorize, deleteFavorite);

export default favoriteRouter;