import { Router } from "express";
import { addFavorite, getFavorites, deleteFavorite } from "../controllers/profile.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const favoriteRouter = Router();

favoriteRouter.post("/favorite", requireAuth, addFavorite);
favoriteRouter.get("/favorite", requireAuth, getFavorites);
favoriteRouter.delete("/favorite/:bookId", requireAuth, deleteFavorite);

export default favoriteRouter;
