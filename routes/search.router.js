import { Router } from "express";
import { searchBooks } from "../controllers/search.controller.js";

const searchRouter = Router();

searchRouter.get("/books/search", searchBooks);

export default searchRouter;